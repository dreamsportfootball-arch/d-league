import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4173/d-league';
const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 960 },
];
const allowedFirstFrameDelta = 8;
const allowedSettledDelta = 8;
const allowedPostPopDrift = 4;
const settledProbeDelayMs = 700;

const fail = (message) => {
  throw new Error(`Navigation visual stability validation failed: ${message}`);
};

const closeHomepagePopup = async (page) => {
  const popupCloseButton = page.getByRole('button', { name: '關閉工作人員合作隊招募' }).last();
  if (await popupCloseButton.isVisible()) await popupCloseButton.click();
};

const installPopProbe = async (page, descriptor) => {
  await page.evaluate(({ anchorId, href, requireTeams }) => {
    window.__dleaguePopProbe = null;
    window.addEventListener('popstate', () => {
      window.requestAnimationFrame(() => {
        const links = [...document.querySelectorAll('a')];
        const isVisible = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const matchingLinks = links.filter((element) => {
          if (!isVisible(element)) return false;
          if (anchorId) return element.getAttribute('data-scroll-anchor-id') === anchorId;
          return element.getAttribute('href') === href;
        });
        const anchor = matchingLinks
          .slice()
          .sort((left, right) => {
            const leftTop = left instanceof HTMLElement ? left.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
            const rightTop = right instanceof HTMLElement ? right.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
            return Math.abs(leftTop - window.__dleaguePopExpectedTop) - Math.abs(rightTop - window.__dleaguePopExpectedTop);
          })[0];
        window.__dleaguePopProbe = {
          hash: window.location.hash,
          found: anchor instanceof HTMLElement,
          top: anchor instanceof HTMLElement ? anchor.getBoundingClientRect().top : null,
          scrollY: window.scrollY,
          teamsMounted: requireTeams ? Boolean(document.getElementById('teams')) : true,
        };
      });
    }, { once: true });
  }, descriptor);
};

const measureAnchor = async (page, descriptor, expectedTop) => page.evaluate(
  ({ anchorId, href, top }) => {
    const links = [...document.querySelectorAll('a')];
    const isVisible = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const matchingLinks = links.filter((element) => {
      if (!isVisible(element)) return false;
      if (anchorId) return element.getAttribute('data-scroll-anchor-id') === anchorId;
      return element.getAttribute('href') === href;
    });
    const anchor = matchingLinks
      .slice()
      .sort((left, right) => {
        const leftTop = left instanceof HTMLElement ? left.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        const rightTop = right instanceof HTMLElement ? right.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
        return Math.abs(leftTop - top) - Math.abs(rightTop - top);
      })[0];
    return {
      found: anchor instanceof HTMLElement,
      top: anchor instanceof HTMLElement ? anchor.getBoundingClientRect().top : null,
      scrollY: window.scrollY,
    };
  },
  { ...descriptor, top: expectedTop },
);

const exerciseReturn = async ({
  page,
  viewportName,
  sourceUrl,
  sourcePattern,
  linkLocator,
  targetPattern,
  requireTeams = false,
  beforeSourceReady,
  label,
}) => {
  await page.goto(sourceUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('#root > *');
  if (beforeSourceReady) await beforeSourceReady();

  // Each scenario establishes its own controlled source position. A prior scenario can leave
  // a route scroll snapshot in sessionStorage, which legitimately starts POP restoration on
  // a full page.goto. Simulate user interaction first so that stale restoration cannot fight
  // the audit's deliberate scrollTo while preserving the Back restoration being tested below.
  await page.evaluate(() => {
    window.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
  });
  await page.waitForTimeout(20);

  const link = linkLocator();
  await link.waitFor({ state: 'visible' });
  await link.evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top - 180), behavior: 'auto' });
  });
  await page.waitForTimeout(120);

  const descriptor = await link.evaluate((element) => ({
    anchorId: element.getAttribute('data-scroll-anchor-id'),
    href: element.getAttribute('href'),
  }));
  if (!descriptor.anchorId && !descriptor.href) {
    fail(`${viewportName} ${label}: source link has neither scroll anchor id nor href`);
  }

  const beforeTop = await link.evaluate((element) => element.getBoundingClientRect().top);
  await page.evaluate((top) => {
    window.__dleaguePopExpectedTop = top;
  }, beforeTop);
  await installPopProbe(page, { ...descriptor, requireTeams });

  await link.click();
  await page.waitForURL(targetPattern);
  await page.waitForSelector('#root > *');

  await page.goBack();
  await page.waitForURL(sourcePattern);
  await page.waitForFunction(() => window.__dleaguePopProbe !== null, null, { timeout: 5000 });
  const probe = await page.evaluate(() => window.__dleaguePopProbe);

  if (!probe?.found) {
    fail(`${viewportName} ${label}: target anchor was missing on the first POP animation frame; probe=${JSON.stringify(probe)}`);
  }
  if (!probe.teamsMounted) {
    fail(`${viewportName} ${label}: deferred homepage content was not mounted on the first POP animation frame`);
  }
  if (probe.top === null || Math.abs(probe.top - beforeTop) > allowedFirstFrameDelta) {
    fail(`${viewportName} ${label}: first POP frame shifted ${probe.top === null ? 'without anchor' : `${Math.abs(probe.top - beforeTop).toFixed(1)}px`}; before=${beforeTop}, probe=${JSON.stringify(probe)}`);
  }

  await page.waitForTimeout(settledProbeDelayMs);
  const settledProbe = await measureAnchor(page, descriptor, beforeTop);
  if (!settledProbe.found || settledProbe.top === null) {
    fail(`${viewportName} ${label}: source anchor disappeared after POP settled; probe=${JSON.stringify(settledProbe)}`);
  }

  const settledDelta = Math.abs(settledProbe.top - beforeTop);
  const postPopDrift = Math.abs(settledProbe.top - probe.top);
  if (settledDelta > allowedSettledDelta) {
    fail(`${viewportName} ${label}: settled POP position shifted ${settledDelta.toFixed(1)}px; before=${beforeTop}, first=${probe.top}, settled=${settledProbe.top}`);
  }
  if (postPopDrift > allowedPostPopDrift) {
    fail(`${viewportName} ${label}: page drifted ${postPopDrift.toFixed(1)}px after the first restored frame; first=${probe.top}, settled=${settledProbe.top}`);
  }

  console.log(`${viewportName} ${label}: first-frame ${Math.abs(probe.top - beforeTop).toFixed(1)}px, settled ${settledDelta.toFixed(1)}px, post-POP drift ${postPopDrift.toFixed(1)}px`);
};

const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);

  try {
    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/`,
      sourcePattern: /#\/$/,
      linkLocator: () => page.locator('#teams a[data-scroll-anchor-id]:visible').first(),
      targetPattern: /#\/teams\//,
      requireTeams: true,
      beforeSourceReady: async () => {
        await closeHomepagePopup(page);
        await page.locator('#teams').waitFor({ state: 'attached' });
      },
      label: 'home -> team -> back',
    });

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/`,
      sourcePattern: /#\/$/,
      linkLocator: () => page.locator('a[data-scroll-anchor-id^="home-news-article-"]:visible').first(),
      targetPattern: /#\/news\//,
      requireTeams: true,
      beforeSourceReady: async () => {
        await closeHomepagePopup(page);
        await page.locator('a[data-scroll-anchor-id^="home-news-article-"]:visible').first().waitFor({ state: 'visible' });
      },
      label: 'home -> news article -> back',
    });

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/news`,
      sourcePattern: /#\/news$/,
      linkLocator: () => page.locator('a[data-scroll-anchor-id^="news-"]:visible').first(),
      targetPattern: /#\/news\//,
      label: 'news list -> article -> back',
    });

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/standings?season=2026-27`,
      sourcePattern: /#\/standings\?season=2026-27$/,
      linkLocator: () => page.locator('a[href*="/teams/"][data-scroll-anchor-id]:visible').first(),
      targetPattern: /#\/teams\//,
      label: 'standings -> team -> back',
    });

    await page.goto(`${baseUrl}/#/standings?season=2026-27`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#root > *');
    await page.evaluate(() => {
      window.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' }));
    });
    const teamLink = page.locator('a[href*="/teams/"][data-scroll-anchor-id]:visible').first();
    await teamLink.waitFor({ state: 'visible' });
    const teamUrl = await teamLink.evaluate((element) => element.href);

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: teamUrl,
      sourcePattern: /#\/teams\//,
      linkLocator: () => page.locator('a[href*="/players/"]:visible').first(),
      targetPattern: /#\/players\//,
      label: 'team -> player -> back',
    });
  } finally {
    await page.close();
    await context.close();
  }
}

await browser.close();
console.log('Navigation visual stability validation passed');
