import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000/kk";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1700 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`${base}/partner/register`, { waitUntil: "load" });
await page.waitForTimeout(500);

await page.fill('input[name="companyName"]', "Test Export LLP");
await page.selectOption('select[name="country"]', "KZ");
await page.fill('input[name="city"]', "Алматы");
await page.click('text=IT');
await page.click('label:has-text("Өндіруші")');
await page.fill('input[name="regNumber"]', "123456789012");
await page.fill('input[name="website"]', "https://example.kz");
await page.fill('input[name="contactName"]', "Test Person");
await page.fill('input[name="position"]', "Director");
await page.fill('input[name="email"]', "test@example.kz");
await page.fill('input[name="whatsapp"]', "+77011234567");
await page.fill('input[name="telegram"]', "@testperson");
await page.fill('textarea[name="goal"]', "Бұл компанияның негізгі мақсаты — Орта Азия аймағында серіктестер табу және экспорт көлемін ұлғайту, сонымен қатар жаңа технологияларды енгізу.");
await page.click('text=Экспорт-Импорт');
await page.click('text=Құпиялылық келісімімен таныстым және келісемін');

await page.screenshot({ path: "/tmp/partner-filled.png" });

const [response] = await Promise.all([
  page.waitForResponse((r) => r.url().includes("/api/partner/register"), { timeout: 10000 }).catch(() => null),
  page.click('button:has-text("Өтінімді жіберу")'),
]);
console.log("RESPONSE_STATUS", response?.status(), await response?.text());
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/partner-success.png", fullPage: true });

console.log(errors.length ? "ERRORS: " + errors.join(" | ") : "NO_CONSOLE_ERRORS");
await browser.close();
