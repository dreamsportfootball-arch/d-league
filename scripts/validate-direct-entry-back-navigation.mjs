import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4173/d-league';
const currentSeason = '2026-27';

const fail = (message) => {
  throw new Error(`Direct-entry back navigation validation failed: ${message}`);
};

const createPage = async (browser, viewport = { width: 390, height: 844 }) => {
  const context = await browser.newContext({
    viewport,
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  return { context, page };
};

const openAsDirectEntry = async (page, url) => {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('#root > *');
};

const browser = await chromium.launch({ headless: true });

try {
  const teamUrl = `${baseUrl}/#/teams/kuromi?season=${currentSeason}`;

  {
    const { context, page } = await createPage(browser);
    try {
      await openAsDirectEntry(page, teamUrl);
      const backButton = page.getByRole('button', { name: '返回積分榜' }).first();
      await backButton.waitFor({ state: 'visible' });
      await backButton.click();
      await page.waitForURL((url) => url.hash.startsWith(`#/standings?season=${currentSeason}`));
    } finally {
      await page.close();
      await context.close();
    }
  }

  let playerUrl = '';
  {
    const { context, page } = await createPage(browser);
    try {
      await page.goto(teamUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('#root > *');
      const playerLink = page.locator('a[href*="/players/"]:visible').first();
      await playerLink.waitFor({ state: 'visible' });
      playerUrl = await playerLink.evaluate((element) => element.href);
      if (!playerUrl) fail('could not discover a current-season player permalink');
    } finally {
      await page.close();
      await context.close();
    }
  }

  {
    const { context, page } = await createPage(browser);
    try {
      await openAsDirectEntry(page, playerUrl);
      const backButton = page.getByRole('button', { name: '返回數據中心' }).first();
      await backButton.waitFor({ state: 'visible' });
      await backButton.click();
      await page.waitForURL((url) => url.hash.startsWith(`#/stats?season=${currentSeason}`));
    } finally {
      await page.close();
      await context.close();
    }
  }

  const articleUrl = `${baseUrl}/#/news/2026-27-18-teams-one-league`;

  {
    const { context, page } = await createPage(browser);
    try {
      await openAsDirectEntry(page, articleUrl);
      await page.getByRole('heading', { name: '18 TEAMS. ONE LEAGUE.', exact: true }).waitFor({ state: 'visible' });

      const articleState = await page.evaluate(() => ({
        href: window.location.href,
        historyState: window.history.state,
        historyLength: window.history.length,
        buttons: Array.from(document.querySelectorAll('button'))
          .map((button) => button.textContent?.trim())
          .filter(Boolean),
      }));
      console.log('[direct-entry/article]', JSON.stringify(articleState));

      const backButton = page.getByRole('button', { name: '返回最新消息' }).first();
      await backButton.waitFor({ state: 'visible' });
      await backButton.click();
      await page.waitForURL((url) => url.hash === '#/news');
    } finally {
      await page.close();
      await context.close();
    }
  }
} finally {
  await browser.close();
}

console.log('Direct-entry back navigation validation passed');
