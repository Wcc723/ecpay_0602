const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
  });
  const page = await browser.newPage();
  try {
    await page.goto('https://ecpay-0602.onrender.com/checkout');
    await page.waitForNavigation();
    await page.waitForTimeout(1000);
    await page.waitForSelector('#liWebATM');
    await page.click('#liWebATM');
    await page.waitForSelector('#selWebATMBank');
    await page.select('#selWebATMBank', '10001@2000@WebATM_TAISHIN');
    await page.click('#WebATMPaySubmit');
    await page.waitForTimeout(1000);
    await page.waitForSelector('#WebATM #btnClose');
    await page.click('#WebATM #btnClose');
    await page.waitForTimeout(500);

    await page.waitForNavigation();
    // await page.waitForNavigation();
    await page.waitForTimeout(500);

    await page.waitForSelector('body > form > fieldset > p > input[type=submit]');
    await page.click('body > form > fieldset > p > input[type=submit]');


    await browser.close();


  } catch (error) {

  }

})();
