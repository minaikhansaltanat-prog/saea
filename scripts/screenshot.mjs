import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3001/kk";
const out = process.argv[3] || "/tmp/shot.png";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width, height } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "load", timeout: 45000 });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });

console.log("SCREENSHOT_OK", out);
if (errors.length) {
  console.log("CONSOLE_ERRORS:");
  for (const e of errors) console.log(" -", e);
} else {
  console.log("NO_CONSOLE_ERRORS");
}

await browser.close();
