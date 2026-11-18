#!/usr/bin/env node
// Smoke test untuk Hococafe Landing Page (tanpa browser, tanpa network).
// Memeriksa struktur + konsistensi konten index.html.
// Keluar 1 bila ada pemeriksaan yang gagal.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
let failures = 0;
function check(name, ok, extra = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
  if (!ok) failures++;
}

// 1. Section wajib ada
for (const id of ["suasana", "menu", "ulasan", "faq", "info"]) {
  check(`section #${id} ada`, html.includes(`id="${id}"`));
}

// 2. Link GitHub repo ada di navbar + footer
const gh = "https://github.com/dezzorigin/hococafe-landing-page";
const ghCount = html.split(gh).length - 1;
check("link GitHub ke repo ada (>=3: navbar, menu mobile, footer)", ghCount >= 3, `${ghCount} kemunculan`);

// 3. Semua link wa.me memakai nomor yang sama (nomor kafe)
const waNumbers = [...html.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]);
const uniqueWa = [...new Set(waNumbers)];
check("semua wa.me memakai satu nomor yang sama", uniqueWa.length === 1, `${waNumbers.length} link, nomor: ${uniqueWa.join(",")}`);
check("nomor WA = 6281264065722", uniqueWa[0] === "6281264065722");

// 4. Filter menu: setiap data-category kartu punya tombol filternya
const filterCats = [...html.matchAll(/data-category="([^"]+)"/g)].map((m) => m[1]);
const btnCats = [...html.matchAll(/<button[^>]*data-category="([^"]+)"/g)].map((m) => m[1]);
const cardOnly = [...new Set(filterCats)].filter((c) => !btnCats.includes(c) && c !== "all");
check("setiap kategori kartu menu punya tombol filter", cardOnly.length === 0, cardOnly.length ? `tanpa tombol: ${cardOnly.join(",")}` : `${[...new Set(filterCats)].join(", ")}`);
const cards = (html.match(/class="menu-item-card/g) || []).length;
check("kartu menu ada (>=6)", cards >= 6, `${cards} kartu`);

// 5. Status buka/tutup: logika zona waktu Asia/Jakarta ada, tanpa round-trip string
check("status pakai Intl.DateTimeFormat Asia/Jakarta", html.includes('timeZone: "Asia/Jakarta"') && html.includes("formatToParts"));
check("tidak ada pola toLocaleString + new Date (rawan zona waktu)", !html.includes("toLocaleString"));

// 6. Animasi fadeIn terdefinisi (dipakai filter menu)
check("keyframes fadeIn terdefinisi di tailwind.config", html.includes("fadeIn: {") && html.includes("animate-fadeIn"));

// 7. Meta wajib
check("og:url menunjuk domain live (bukan netlify lama)", !html.includes("hococafe.netlify.app"));
check("title + description ada", html.includes("<title>Hoco Coffee") && html.includes('name="description"'));

// 8. Tidak ada penanda kerja belum selesai
check('tanpa "TODO"/"FIXME"/"lorem"', !/TODO|FIXME|lorem ipsum/i.test(html));

// 9. File diakhiri newline
check("index.html diakhiri newline", html.endsWith("\n"));

console.log(failures === 0 ? `\nOK: semua ${"pemeriksaan"} lolos` : `\nGAGAL: ${failures} pemeriksaan`);
process.exit(failures === 0 ? 0 : 1);
