import { chromium } from "playwright";

const base = "http://localhost:3000/kk";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("console", (msg) => console.log("[console]", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("[pageerror]", String(err)));
page.on("requestfailed", (req) => console.log("[requestfailed]", req.url(), req.failure()?.errorText));
page.on("response", (res) => {
  if (res.url().includes("/api/admin/partners")) console.log("[response]", res.status(), res.url());
});

// Login as partner_admin (should NOT have access to /admin/members)
await page.goto(`${base}/admin/login`, { waitUntil: "load" });
await page.waitForTimeout(400);
await page.fill('input[name="email"]', "partner.admin@caea.kz");
await page.fill('input[name="password"]', "Partner#12345");
await page.click('button:has-text("Кіру")');
await page.waitForURL(`**/admin`, { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(600);

console.log("Logged in as partner_admin, at:", page.url());

// Try to directly access /admin/members (membership_admin/super_admin only)
await page.goto(`${base}/admin/members`, { waitUntil: "load" });
await page.waitForTimeout(600);
console.log("Tried /admin/members ->", page.url(), "(expect redirect to /admin)");

// Try /admin/settings (super_admin only)
await page.goto(`${base}/admin/settings`, { waitUntil: "load" });
await page.waitForTimeout(600);
console.log("Tried /admin/settings ->", page.url(), "(expect redirect to /admin)");

// Confirm /admin/partners IS accessible
await page.goto(`${base}/admin/partners`, { waitUntil: "load" });
await page.waitForTimeout(1200);
console.log("Tried /admin/partners ->", page.url(), "(expect success, stay on /admin/partners)");
await page.screenshot({ path: "/tmp/admin-partner-admin-view.png", fullPage: true });

// Debug: how many "Бекіту" buttons exist at all, and how many company names are visible
const allApprove = page.locator('button:has-text("Бекіту")');
console.log("Total Бекіту buttons on page:", await allApprove.count());
const companyCount = await page.locator("text=Silk Road Logistics").count();
console.log("Silk Road Logistics text matches:", companyCount);

const approveBtn = allApprove.first();
const before = await approveBtn.count();
console.log("Approve buttons visible:", before);
if (before > 0) {
  await approveBtn.scrollIntoViewIfNeeded();
  await approveBtn.click({ force: true });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "/tmp/admin-partner-after-approve.png", fullPage: true });
  console.log("Clicked approve, screenshot taken");
}

await browser.close();
