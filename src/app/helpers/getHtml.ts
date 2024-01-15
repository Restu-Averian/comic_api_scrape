import puppeteer from "puppeteer";

const getHtml = async (url: string) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  await new Promise((r) => setTimeout(r, 2000));

  const html = await page.content();

  await browser.close();

  return html;
};
export default getHtml;
