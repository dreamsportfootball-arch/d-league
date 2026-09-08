from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file = Path(path)
    text = file.read_text()
    if old not in text:
        raise SystemExit(f"Expected pattern not found in {path}: {old[:120]!r}")
    file.write_text(text.replace(old, new, 1))


replace_once(
    'App.tsx',
    """    } else {\n      frameId = window.requestAnimationFrame(restore);\n    }\n""",
    """    } else {\n      // Restore during the layout phase whenever the destination DOM is already available.\n      // Waiting for the next animation frame can expose an incorrect intermediate scroll position.\n      restore();\n    }\n""",
)

Path('components/DeferredSection.tsx').write_text("""import React, { useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
  persistKey?: string;
}

const revealedSections = new Set<string>();

const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  minHeight = 240,
  rootMargin = '600px 0px',
  className = '',
  persistKey,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() =>
    persistKey ? revealedSections.has(persistKey) : false,
  );

  useEffect(() => {
    if (visible) return;
    const element = rootRef.current;
    const reveal = () => {
      if (persistKey) revealedSections.add(persistKey);
      setVisible(true);
    };

    if (!element || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [persistKey, rootMargin, visible]);

  return (
    <div ref={rootRef} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default DeferredSection;
""")

replace_once(
    'pages/HomePage.tsx',
    '<DeferredSection minHeight={520} rootMargin="1000px 0px">',
    '<DeferredSection minHeight={520} rootMargin="1000px 0px" persistKey="home-main-content">',
)

replace_once(
    'components/NewsSection.tsx',
    """                to={`/news/${article.id}`}\n                className="group relative flex cursor-pointer items-start space-x-5 overflow-hidden p-5 text-left transition-colors hover:bg-neutral-50"\n""",
    """                to={`/news/${article.id}`}\n                data-scroll-anchor-id={`home-news-article-${article.seasonId ?? 'global'}-${article.id}`}\n                className="group relative flex cursor-pointer items-start space-x-5 overflow-hidden p-5 text-left transition-colors hover:bg-neutral-50"\n""",
)
replace_once(
    'components/NewsSection.tsx',
    """          to="/news"\n          className="group/btn flex w-full items-center justify-center py-2 text-center text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors hover:text-brand-black"\n""",
    """          to="/news"\n          data-scroll-anchor-id="home-news-all"\n          className="group/btn flex w-full items-center justify-center py-2 text-center text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors hover:text-brand-black"\n""",
)

replace_once(
    'components/home/ActiveHomeContent.tsx',
    """                to="/standings"\n                onClick={() => {\n""",
    """                to="/standings"\n                data-scroll-anchor-id={`home-full-standings-${activeSeason.id}-${activeLeague}`}\n                onClick={() => {\n""",
)

replace_once(
    'components/MatchCenter.tsx',
    """                to={`/schedule?season=${activeSeason.id}`}\n                className="ml-4 flex items-center text-sm font-bold text-neutral-500 hover:text-brand-black"\n""",
    """                to={`/schedule?season=${activeSeason.id}`}\n                data-scroll-anchor-id={`home-full-schedule-${activeSeason.id}`}\n                className="ml-4 flex items-center text-sm font-bold text-neutral-500 hover:text-brand-black"\n""",
)

replace_once(
    'components/RegistrationOverview.tsx',
    """                to="/registration"\n                data-analytics-event="registration_details_click"\n""",
    """                to="/registration"\n                data-scroll-anchor-id={`home-registration-details-${activeSeason.id}`}\n                data-analytics-event="registration_details_click"\n""",
)

replace_once(
    'components/home/StatusHomeContent.tsx',
    """          <Link to="/news" className="rounded-full bg-brand-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white">\n""",
    """          <Link to="/news" data-scroll-anchor-id="home-status-news" className="rounded-full bg-brand-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white">\n""",
)
replace_once(
    'components/home/StatusHomeContent.tsx',
    """          <Link to="/registration" className="rounded-full border border-neutral-300 px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-black">\n""",
    """          <Link to="/registration" data-scroll-anchor-id="home-status-registration" className="rounded-full border border-neutral-300 px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-black">\n""",
)

Path('scripts/validate-navigation-visual-stability.mjs').write_text(r'''import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4173/d-league';
const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'desktop-1280', width: 1280, height: 900 },
];
const allowedFirstFrameDelta = 64;

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
        const anchor = anchorId
          ? links.find((element) => element.getAttribute('data-scroll-anchor-id') === anchorId)
          : links.find((element) => element.getAttribute('href') === href);
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

  console.log(`${viewportName} ${label}: first POP frame stable within ${Math.abs(probe.top - beforeTop).toFixed(1)}px`);
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
      linkLocator: () => page.locator('#teams a[data-scroll-anchor-id]').first(),
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
      linkLocator: () => page.locator('a[data-scroll-anchor-id^="home-news-article-"]').first(),
      targetPattern: /#\/news\//,
      requireTeams: true,
      beforeSourceReady: async () => {
        await closeHomepagePopup(page);
        await page.locator('a[data-scroll-anchor-id^="home-news-article-"]').first().waitFor({ state: 'visible' });
      },
      label: 'home -> news article -> back',
    });

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/news`,
      sourcePattern: /#\/news$/,
      linkLocator: () => page.locator('a[data-scroll-anchor-id^="news-"]').first(),
      targetPattern: /#\/news\//,
      label: 'news list -> article -> back',
    });

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: `${baseUrl}/#/standings?season=2026-27`,
      sourcePattern: /#\/standings\?season=2026-27$/,
      linkLocator: () => page.locator('a[href*="/teams/"][data-scroll-anchor-id]').first(),
      targetPattern: /#\/teams\//,
      label: 'standings -> team -> back',
    });

    await page.goto(`${baseUrl}/#/standings?season=2026-27`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#root > *');
    const teamLink = page.locator('a[href*="/teams/"][data-scroll-anchor-id]').first();
    await teamLink.waitFor({ state: 'visible' });
    const teamUrl = await teamLink.evaluate((element) => element.href);

    await exerciseReturn({
      page,
      viewportName: viewport.name,
      sourceUrl: teamUrl,
      sourcePattern: /#\/teams\//,
      linkLocator: () => page.locator('a[href*="/players/"]').first(),
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
''')

Path('scripts/oneoff-fix-navigation-visual-stability.py').unlink()
