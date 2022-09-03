const puppeteer = require("puppeteer");
const fs = require('fs')

const bot = async (htmlURL, pdfOptions = { width: 595, height: 842 }) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  if (htmlURL && htmlURL.file) {
    const html = fs.readFileSync(htmlURL.file, 'utf8');
    await page.setContent(html, {
      waitUntil: 'domcontentloaded'
    });
    console.log(`Generating PDF for ${htmlURL.file}`);
  } else if (htmlURL && htmlURL.url) {
    await page.goto(htmlURL.url, {
      waitUntil: 'networkidle2'
    });
    console.log(`Generating PDF for ${htmlURL.url}`);
  }

  const buffer = await page.pdf({
    path: 'result.pdf',
    format: 'A4',
    margin: { left: '1cm', top: '1cm', right: '1cm', bottom: '1cm' },
    printBackground: true,
    width: pdfOptions.width,
    height: pdfOptions.height,
  });
  // await console.log('Puppeteer PDF created')
  return buffer;
}
const bot3 = async () => {
  console.log('start bot');
  await puppeteer
    .launch()
    .then(async function (browser) {

      console.log('browser launched');

      const page = await browser.newPage();
      console.log('page opened');

      await page.goto('https://www.google.com');
      console.log('site opened');

      await page.screenshot({ 'path': './google.png' });
      console.log('site screen captured');

      await browser.close();
      console.log('browser closed');
    })
}

const bot2 = async () => {
  console.log('start bot');
  const browser = await puppeteer.launch({
    //headless: true,
    //arg: ['--no-sandbox'],
    //width: 1920,
    //height: 1080,
  });
  console.log('browser launched');

  const page = await browser.newPage();

  console.log('page opened');

  await page.goto('https://www.google.com', {
    waitUntil: 'networkidle2'
  });

  console.log('site opened');

  await browser.close();

  console.log('browser closed');

  return 'Done';

}

module.exports = bot;