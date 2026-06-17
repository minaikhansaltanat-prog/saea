import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000/kk";
const path = process.argv[3] || "/dashboard";
const out = process.argv[4] || "/tmp/dashboard.png";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`${base}/login`, { waitUntil: "load" });
await page.waitForTimeout(400);
await page.click('button:has-text("Кіру")');
await page.waitForURL(`**${path}`, { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(800);
await page.goto(`${base}${path}`, { waitUntil: "load" });
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: true });

console.log("URL", page.url());
console.log(errors.length ? "ERRORS: " + errors.join(" | ") : "NO_CONSOLE_ERRORS");
await browser.close();
