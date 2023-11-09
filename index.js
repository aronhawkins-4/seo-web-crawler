import puppeteer, { Puppeteer } from "puppeteer";

async function main() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://google.com/search?q=waco+marketing");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await autoScroll(page);
  const skLink = await page.$$eval("a", (as) =>
    as.map((a) => {
      if (a.href.includes("sidekick.agency")) {
        a.click();
      }
    })
  );
  await page.waitForNavigation();
  await autoScroll(page);

  await page.screenshot({
    path: "yoursite.png",
    fullPage: true,
  });
  await browser.close();
}
main();
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
