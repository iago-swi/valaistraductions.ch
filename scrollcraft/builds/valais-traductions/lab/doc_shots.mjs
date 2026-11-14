// Takes the README screenshots of the running site (php -S localhost:8124 from the repository root).
//   node lab/doc_shots.mjs            (run from this build folder, where playwright-core is installed)
import path from "node:path";
import { createRequire } from "node:module";

const { chromium } = createRequire(path.join(process.cwd(), "package.json"))("playwright-core");
const OUT = path.resolve("../../../docs/screenshots");
const URL = "http://localhost:8124/fr/index.html";
const CHROME = process.env.SCROLLCRAFT_CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";

// Same pixel sizes as the screenshots in the noth.ch repository.
const shots = [
  { file: "desktop-home.png",     width: 1440, height: 842, scale: 1.375, progress: 0 },
  { file: "desktop-crossing.png", width: 1440, height: 842, scale: 1.375, progress: 0.9 },   // far side, paragraph fully in French
  { file: "mobile-home.png",      width: 390,  height: 874, scale: 2.775, progress: 0 },
];

const browser = await chromium.launch({ executablePath: CHROME });
for (const s of shots) {
  const context = await browser.newContext({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: s.scale });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Scroll to a given progress of the opening scene (its pinned travel is its height minus one viewport).
  await page.evaluate((p) => {
    const act = document.querySelector(".vt-cross");
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, act.offsetTop + p * (act.offsetHeight - innerHeight));
  }, s.progress);
  await page.waitForTimeout(1500);                       // let the engine and the segment transitions settle
  await page.screenshot({ path: path.join(OUT, s.file) });
  console.log(s.file);
  await context.close();
}
await browser.close();
