import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3001/kk";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.screenshot({ path: "/tmp/mobile-closed.png" });

await page.click('button[aria-label="Меню"]');
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/mobile-drawer-open.png" });

await page.locator('button[aria-label="Тілді таңдау"]').last().click();
await page.waitForTimeout(300);
await page.screenshot({ path: "/tmp/mobile-drawer-lang-open.png" });

console.log("DONE");
if (errors.length) {
  console.log("CONSOLE_ERRORS:");
  for (const e of errors) console.log(" -", e);
} else {
  console.log("NO_CONSOLE_ERRORS");
}

await browser.close();
