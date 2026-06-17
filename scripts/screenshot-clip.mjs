import { chromium } from "playwright";

const url = process.argv[2];
const out = process.argv[3];
const y = Number(process.argv[4] || 0);
const h = Number(process.argv[5] || 900);
const width = Number(process.argv[6] || 1440);

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width, height: y + h } });
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.screenshot({ path: out, clip: { x: 0, y, width, height: h } });
console.log("OK", out);
await browser.close();
