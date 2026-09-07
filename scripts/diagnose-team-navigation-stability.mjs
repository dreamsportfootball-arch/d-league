import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4173/d-league';
const makeUrl = (routePath) => `${baseUrl}/#${routePath}`;
const targets = [
  { name: 'KUROMI', ariaLabel: '查看 KUROMI 球隊頁', expectedHash: '#/teams/kuromi?season=2026-27' },
  { name: '阿蓮FC', ariaLabel: '查看 阿蓮FC 球隊頁', expectedHash: '#/teams/alian-fc?season=2026-27' },
];
const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'desktop-1280', width: 1280, height: 900 },
];

const browser = await chromium.launch({ headless: true });
let failed = false;

for (const viewport of viewports) {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      locale: 'zh-TW',
      timezoneId: 'Asia/Taipei',
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);

    try {
      await page.goto(makeUrl('/'), { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('#root > *', { timeout: 12000 });
      await page.waitForTimeout(800);

      const link = page.getByRole('link', { name: target.ariaLabel });
      if ((await link.count()) !== 1) throw new Error(`Expected one ${target.ariaLabel} link`);
      await link.scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);

      await page.evaluate(() => {
        const state = {
          startedAt: performance.now(),
          samples: [],
          shifts: [],
          observer: null,
          raf: 0,
        };

        const sample = () => {
          const heading = document.querySelector('#main-content h1');
          const headingText = heading?.textContent?.trim() ?? '';
          const headingSpan = heading?.querySelector('span') ?? heading;
          const hero = heading?.closest('section');
          const logo = hero?.querySelector('img[alt$="隊徽"]');
          const headingRect = heading?.getBoundingClientRect();
          const heroRect = hero?.getBoundingClientRect();
          const spanStyle = headingSpan ? getComputedStyle(headingSpan) : null;

          state.samples.push({
            t: performance.now() - state.startedAt,
            hash: location.hash,
            scrollY: window.scrollY,
            documentHeight: document.documentElement.scrollHeight,
            headingText,
            headingTop: headingRect?.top ?? null,
            headingHeight: headingRect?.height ?? null,
            heroTop: heroRect?.top ?? null,
            heroHeight: heroRect?.height ?? null,
            fontSize: spanStyle?.fontSize ?? null,
            fontFamily: spanStyle?.fontFamily ?? null,
            logoComplete: logo instanceof HTMLImageElement ? logo.complete : null,
            logoNaturalWidth: logo instanceof HTMLImageElement ? logo.naturalWidth : null,
          });

          if (performance.now() - state.startedAt < 1600) {
            state.raf = requestAnimationFrame(sample);
          }
        };

        if ('PerformanceObserver' in window) {
          try {
            state.observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                state.shifts.push({
                  t: entry.startTime - state.startedAt,
                  value: entry.value,
                  hadRecentInput: entry.hadRecentInput,
                  sources: Array.from(entry.sources ?? []).map((source) => {
                    const node = source.node;
                    if (!(node instanceof Element)) return null;
                    return {
                      tag: node.tagName,
                      id: node.id,
                      className: typeof node.className === 'string' ? node.className.slice(0, 160) : '',
                      text: node.textContent?.trim().slice(0, 80) ?? '',
                    };
                  }).filter(Boolean),
                });
              }
            });
            state.observer.observe({ type: 'layout-shift', buffered: false });
          } catch {
            state.observer = null;
          }
        }

        window.__teamNavigationDiagnostics = state;
        state.raf = requestAnimationFrame(sample);
      });

      const beforeScrollY = await page.evaluate(() => window.scrollY);
      await link.click();
      await page.waitForFunction((expectedHash) => location.hash === expectedHash, target.expectedHash);
      await page.waitForFunction((teamName) => document.querySelector('#main-content h1')?.textContent?.trim() === teamName, target.name);
      await page.waitForTimeout(1250);

      const result = await page.evaluate(() => {
        const state = window.__teamNavigationDiagnostics;
        if (!state) return null;
        if (state.raf) cancelAnimationFrame(state.raf);
        state.observer?.disconnect();
        return { samples: state.samples, shifts: state.shifts };
      });
      if (!result) throw new Error('Navigation diagnostics were unavailable');

      const teamSamples = result.samples.filter((sample) => sample.headingText === target.name);
      if (teamSamples.length === 0) throw new Error(`No rendered samples found for ${target.name}`);

      const range = (values) => {
        const finite = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
        if (finite.length === 0) return null;
        return Math.max(...finite) - Math.min(...finite);
      };
      const summary = {
        viewport: viewport.name,
        team: target.name,
        beforeScrollY,
        sampleCount: teamSamples.length,
        firstTeamSampleMs: Math.round(teamSamples[0].t),
        scrollYRangeAfterTeamRender: range(teamSamples.map((sample) => sample.scrollY)),
        headingTopRange: range(teamSamples.map((sample) => sample.headingTop)),
        headingHeightRange: range(teamSamples.map((sample) => sample.headingHeight)),
        heroTopRange: range(teamSamples.map((sample) => sample.heroTop)),
        heroHeightRange: range(teamSamples.map((sample) => sample.heroHeight)),
        documentHeightRange: range(teamSamples.map((sample) => sample.documentHeight)),
        fontSizes: [...new Set(teamSamples.map((sample) => sample.fontSize).filter(Boolean))],
        fontFamilies: [...new Set(teamSamples.map((sample) => sample.fontFamily).filter(Boolean))],
        logoStates: [...new Set(teamSamples.map((sample) => `${sample.logoComplete}:${sample.logoNaturalWidth}`))],
        layoutShiftTotal: Number(result.shifts.reduce((sum, shift) => sum + shift.value, 0).toFixed(6)),
        layoutShifts: result.shifts,
        firstSamples: teamSamples.slice(0, 8),
        lastSamples: teamSamples.slice(-4),
      };

      console.log(`[team-navigation-stability] ${JSON.stringify(summary)}`);
    } catch (error) {
      failed = true;
      console.error(`[team-navigation-stability] ${viewport.name} / ${target.name}: ${error.message}`);
    } finally {
      await page.close();
      await context.close();
    }
  }
}

await browser.close();
if (failed) process.exitCode = 1;
