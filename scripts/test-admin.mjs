import { chromium } from "playwright";

const base = "http://localhost:3000/kk";
const pages = ["/admin", "/admin/members", "/admin/partners", "/admin/content/news", "/admin/content/team", "/admin/notifications", "/admin/audit", "/admin/roles", "/admin/settings"];

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const allErrors = [];
page.on("console", (msg) => { if (msg.type() === "error") allErrors.push(msg.text()); });
page.on("pageerror", (err) => allErrors.push(String(err)));

await page.goto(`${base}/admin/login`, { waitUntil: "load" });
await page.waitForTimeout(400);
await page.click('button:has-text("Кіру")');
await page.waitForURL(`**/admin`, { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(700);

for (const p of pages) {
  allErrors.length = 0;
  await page.goto(`${base}${p}`, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const name = p.replace(/\//g, "_") || "_root";
  await page.screenshot({ path: `/tmp/admin${name}.png`, fullPage: true });
  console.log(p, "->", page.url(), allErrors.length ? "ERRORS: " + allErrors.join(" | ") : "OK");
}

await browser.close();
