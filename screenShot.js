const puppeteer = require('puppeteer');

const query = 'JavaScript';
const url = `https://www.google.com/search?q=${query}`;

const takeScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url);
  const screenshot = await page.screenshot({ fullPage: true });
  await browser.close();
  return screenshot;
};

const saveScreenshot = async (filename) => {
  const screenshot = await takeScreenshot();
  require('fs').writeFileSync(filename, screenshot);
  console.log(`Screenshot saved to ${filename}`);
};

saveScreenshot('google-search.png');
