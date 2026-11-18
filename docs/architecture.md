# Arsitektur — Hoco Coffee Landing Page

## Gambaran

Satu file statis (`index.html`, ~65 KB) yang disajikan apa adanya oleh
Cloudflare Pages. Tidak ada build step, tidak ada bundler, tidak ada backend,
tidak ada database. Semua yang dinamis dihitung di browser pengunjung.

```
Pengunjung → Browser → index.html (Cloudflare Pages)
                          ├─ Tailwind Play CDN (runtime CSS)
                          ├─ Google Fonts (Inter, Playfair Display)
                          ├─ Font Awesome 6 CDN (ikon)
                          └─ Unsplash (foto stok)
Interaksi keluar: wa.me (WhatsApp kafe), Google Maps (rute), github.com (repo)
```

Diagram: `docs/diagram.svg`.

## Lapisan

| Lapisan | Isi | Catatan |
|---|---|---|
| Struktur | HTML5 semantik, 6 seksi bernomor (`#suasana`, `#menu`, `#ulasan`, `#faq`, `#info` + hero & footer) | Satu file; komentar `<!-- N. ... -->` menandai tiap seksi |
| Gaya | Tailwind Play CDN (`cdn.tailwindcss.com`) + `<style>` kustom (scrollbar, reveal, glass, delay) | Tailwind di-compile di browser saat halaman dimuat — ini arsitektur halaman, bukan kekurangan yang bisa "diperbaiki" tanpa build step |
| Font & ikon | Google Fonts + Font Awesome 6.4.0 (CDN) | Bila CDN mati, halaman tetap terbaca dengan font sistem |
| Foto | Unsplash `images.unsplash.com` (7 foto) | Foto stok, bukan foto asli kafe — lihat README § Batasan |
| Logika | JavaScript vanilla di akhir `<body>`, 6 blok bernomor | Tanpa framework; tanpa penyimpanan lokal |

## Blok JavaScript

| # | Nama | Cara kerja |
|---|---|---|
| 1 | Scroll reveal | `IntersectionObserver`, threshold 0.1; class `reveal` → `active` sekali, lalu `unobserve` |
| 2 | Navbar + back-to-top | `scroll` listener: >50px navbar mengecil + bayangan; >400px tombol back-to-top muncul |
| 3 | Menu mobile | `toggleMenu()` membalik class `-translate-y-full`/`translate-y-0`; kunci scroll `body` saat terbuka; semua `.mobile-link` menutup menu saat diklik |
| 4 | Status buka/tutup | `Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", weekday, hour, minute, hour12: false })` + `formatToParts` → hari & menit WIB → cocokkan ke tabel jam (Sen–Kam 08:00–23:30, Jum 14:00–23:30, Sab–Min 07:00–23:30) → update 3 badge (nav, hero, menu mobile); `setInterval` 60 detik |
| 5 | Filter menu | Tombol `.menu-filter-btn` (`data-category`) vs kartu `.menu-item-card` (`data-category`); kartu yang cocok `display:flex` + class `animate-fadeIn`, sisanya `display:none` |
| 6 | FAQ accordion | Klik `.faq-toggle` menutup semua `.faq-content` lain, lalu membuka yang diklik (atau menutup bila sudah terbuka); ikon berputar `rotate-180` |

## Data

Tidak ada data dinamis. Satu-satunya "data" adalah konten yang tertulis di
HTML: 6 menu + harga, jam operasional, nomor WhatsApp (satu nomor di 12
tautan — dijaga smoke test), 3 testimoni, 4 FAQ.

## Deployment

- **Cloudflare Pages** (direct upload via API): project `hococafe`,
  https://hococafe.pages.dev. Deploy = upload seluruh isi repo (file statis).
- **CI** (`.github/workflows/ci.yml`): `validate` (html-validate),
  `links` (markdown-link-check), `smoke` (`node scripts/smoke.mjs`).
  Tidak ada job build — tidak ada yang di-build.
- **Kenapa tanpa Lighthouse di CI:** halaman memakai Tailwind Play CDN +
  foto Unsplash; skor performa ditentukan CDN, bukan kode repo. Lighthouse
  tetap dijalankan manual saat rilis untuk memantau, bukan sebagai gerbang.

## Pengujian

- `node scripts/smoke.mjs` — struktur & konsistensi (17 pemeriksaan).
- `npx html-validate index.html` — 0 error.
- Play-test headless (lihat `docs/testing.md` bila ada): desktop 1280px +
  mobile 390px — hero, filter tiap kategori, FAQ buka/tutup, menu mobile,
  status badge, 0 console error, tanpa overflow horizontal.
