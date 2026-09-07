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
  await page.goto('about:blank');
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

  let articleUrl = '';
  {
    const { context, page } = await createPage(browser);
    try {
      await page.goto(`${baseUrl}/#/news`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('#root > *');
      const articleLink = page.locator('a[data-scroll-anchor-id^="news-"]:visible').first();
      await articleLink.waitFor({ state: 'visible' });
      articleUrl = await articleLink.evaluate((element) => element.href);
      if (!articleUrl) fail('could not discover a news article permalink');
    } finally {
      await page.close();
      await context.close();
    }
  }

  {
    const { context, page } = await createPage(browser);
    try {
      await openAsDirectEntry(page, articleUrl);
      const backButtons = page.getByRole('button', { name: '返回最新消息' });
      if ((await backButtons.count()) < 1) fail('direct article entry did not show 返回最新消息');
      await backButtons.first().click();
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
