import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/assets/images/compare");
const BASE = process.env.COMPARE_BASE_URL ?? "http://localhost:3000";

const DRAFT = {
  giftId: "gift-men-premium",
  recipientName: "سارة أحمد",
  senderName: "أبو بكر",
  message:
    "أتمنى لكِ لحظات مليئة بالهدوء والاسترخاء — هذه هدية من القلب لتستحقيها بكل حب.",
  theme: "olive",
  visit: {
    place: "center",
    branchId: "yasmin",
    branchName: "فرع الياسمين",
    slotLabel: "الثلاثاء 12 نوفمبر · 4:00 م",
  },
};

const PRODUCT = {
  id: "gift-men-premium",
  title: "باقة الرجال المميزة",
  description: "مساج وعناية واسترخاء في باقة واحدة.",
  priceSar: 480,
  badge: "باقة",
  durationMinutes: 180,
  serviceCount: 3,
  places: ["center", "home"],
  branchCount: 3,
  branchNames: ["الياسمين", "النخيل", "جدة"],
  imageUrl: "/assets/images/gifts/pkg-men.jpg",
  available: true,
};

const ORDER = {
  orderId: "YS-GIFT-DEMO-4801",
  draft: DRAFT,
  product: PRODUCT,
  serviceCount: 1,
  giftCount: 1,
  directBookingCount: 0,
  subtotalSar: 417.39,
  taxSar: 62.61,
  totalSar: 480,
  createdAt: new Date().toISOString(),
};

const CLEAN_CSS = `
  *,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;}
  nextjs-portal,[data-nextjs-toast],#__next-build-watcher{display:none!important;}
  html{scroll-behavior:auto!important;}
`;

async function prepare(page) {
  await page.addStyleTag({ content: CLEAN_CSS });
  await page.evaluate(async () => {
    window.scrollTo(0, 0);
    const imgs = [...document.images];
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.onload = img.onerror = () => r();
            })
      )
    );
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(400);
}

async function shot(page, name) {
  await prepare(page);
  const file = path.join(OUT, name);
  await page.screenshot({
    path: file,
    fullPage: true,
    type: "png",
    animations: "disabled",
  });
  const { size } = fs.statSync(file);
  console.log(`✓ ${name} (${Math.round(size / 1024)} KB)`);
}

async function seedDraft(page) {
  await page.goto(`${BASE}/gifts`, { waitUntil: "networkidle" });
  await page.evaluate((draft) => {
    sessionStorage.setItem("yallah.gift.draft", JSON.stringify(draft));
  }, DRAFT);
}

async function seedOrder(page) {
  await page.goto(`${BASE}/gifts`, { waitUntil: "networkidle" });
  await page.evaluate(
    ({ draft, order }) => {
      sessionStorage.setItem("yallah.gift.draft", JSON.stringify(draft));
      sessionStorage.setItem("yallah.gift.lastOrder", JSON.stringify(order));
    },
    { draft: DRAFT, order: ORDER }
  );
}

async function captureViewport(browser, viewport, prefix) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    locale: "ar-SA",
    colorScheme: "light",
  });
  const page = await context.newPage();

  await page.goto(`${BASE}/gifts`, { waitUntil: "networkidle" });
  await shot(page, `${prefix}-browse.png`);

  await page.goto(`${BASE}/gifts/search`, { waitUntil: "networkidle" });
  await shot(page, `${prefix}-search.png`);

  await seedDraft(page);
  await page.goto(`${BASE}/gifts/personalize?giftId=gift-men-premium`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(500);
  await shot(page, `${prefix}-personalize.png`);

  await seedDraft(page);
  await page.goto(`${BASE}/gifts/review`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=مراجعة الطلب");
  await shot(page, `${prefix}-review.png`);

  await seedOrder(page);
  await page.goto(`${BASE}/gifts/success`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=تم");
  await shot(page, `${prefix}-success.png`);

  await context.close();
}

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  console.log("Desktop…");
  await captureViewport(browser, { width: 1440, height: 900 }, "after-desktop");
  console.log("Mobile…");
  await captureViewport(browser, { width: 390, height: 844 }, "after-mobile");
  console.log("Done.");
} finally {
  await browser.close();
}
