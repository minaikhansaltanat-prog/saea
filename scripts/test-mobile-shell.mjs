import { chromium } from "playwright";

const base = "http://localhost:3000/kk";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

// Login as member, check dashboard mobile drawer
await page.goto(`${base}/login`, { waitUntil: "load" });
await page.waitForTimeout(400);
await page.click('button:has-text("Кіру")');
await page.waitForURL(`**/dashboard`, { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(700);

// check horizontal overflow
let scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
let clientW = await page.evaluate(() => document.documentElement.clientWidth);
console.log("Dashboard overview: scrollWidth", scrollW, "clientWidth", clientW, scrollW > clientW ? "HORIZONTAL OVERFLOW!" : "OK");

await page.click('button[aria-label="Меню"]');
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/mobile-dashboard-drawer.png" });
console.log("Dashboard drawer screenshot taken");

// Close via X
await page.locator('button[aria-label="Жабу"]').last().click();
await page.waitForTimeout(400);

// Now admin
await page.goto(`${base}/admin/login`, { waitUntil: "load" });
await page.waitForTimeout(400);
await page.click('button:has-text("Кіру")');
await page.waitForURL(`**/admin`, { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(700);

scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
clientW = await page.evaluate(() => document.documentElement.clientWidth);
console.log("Admin dashboard: scrollWidth", scrollW, "clientWidth", clientW, scrollW > clientW ? "HORIZONTAL OVERFLOW!" : "OK");

await page.click('button[aria-label="Меню"]');
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/mobile-admin-drawer.png" });
console.log("Admin drawer screenshot taken");
await page.locator('button[aria-label="Жабу"]').last().click();
await page.waitForTimeout(400);

for (const p of ["/admin/members", "/admin/partners", "/admin/audit", "/admin/roles", "/admin/settings"]) {
  await page.goto(`${base}${p}`, { waitUntil: "load" });
  await page.waitForTimeout(600);
  scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  clientW = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(p, "scrollWidth", scrollW, "clientWidth", clientW, scrollW > clientW ? "HORIZONTAL OVERFLOW!" : "OK");
}

console.log(errors.length ? "CONSOLE ERRORS: " + errors.join(" | ") : "NO_CONSOLE_ERRORS");
await browser.close();
