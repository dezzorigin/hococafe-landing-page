# Changelog

Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
proyek ini mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Catatan jujur: CHANGELOG lama berisi klaim fiktif (setup Next.js, contact form,
dark mode, perbaikan XSS) yang tidak pernah ada di repo ini — satu file HTML
statis. Entri-entri itu dibuang pada v1.2.0; riwayat di bawah ini ditulis ulang
dari isi repo dan git log yang sebenarnya.

## [1.2.0] - 2026-11-18

### Added
- Logo GitHub di navbar (kanan) + menu mobile + footer, tautan ke repo ini.
- CI GitHub Actions: html-validate, markdown-link-check, smoke test
  (`scripts/smoke.mjs` — section wajib, nomor WA tunggal, kategori filter
  sinkron, status memakai zona Asia/Jakarta).
- `.gitignore` (artefak lokal, hasil audit).
- Dokumentasi jujur: README, PRD v2.0, `docs/architecture.md`,
  `docs/diagram.svg`, screenshot + video demo.
- Deploy Cloudflare Pages: https://hococafe.pages.dev.

### Fixed
- 39 error `html-validate` di `index.html`: `&` mentah di URL/teks →
  `&amp;`, `type="button"` di semua `<button>`, `<img/>` → `<img>`,
  inline `style` → class CSS, hyphen nomor telepon → non-breaking hyphen,
  trailing whitespace.
- Animasi filter menu mati: class `animate-fadeIn` dipakai JS tapi keyframes
  `fadeIn` tidak pernah didefinisikan di `tailwind.config` — kini ditambahkan,
  filter benar-benar beranimasi.
- Status buka/tutup ditulis ulang memakai `Intl.DateTimeFormat` +
  `formatToParts` zona Asia/Jakarta — tanpa round-trip string → `Date`,
  jadi benar di browser pengunjung mana pun.

### Changed
- `og:url` diperbarui dari domain Netlify lama ke https://hococafe.pages.dev.
- README/PRD/CHANGELOG lama yang fiktif ditulis ulang sesuai isi repo.

## [1.1.0] - 2026-09-26

Redesign oleh google-labs-jules[bot] di branch
`feat/redesign-landing-page-952758711627156143` (commit 7448c7f) — branch
tidak pernah ter-merge; diselamatkan 18 Nov 2026 via cherry-pick ke `feat/proper`.

### Added
- Filter kategori menu (Semua / Kopi / Non-Kopi / Makanan / Dessert).
- Seksi Ulasan (3 testimoni) dan FAQ interaktif (4 item accordion).
- Status buka/tutup live di navbar, hero, dan menu mobile.
- Bar statistik hero (rating, WiFi, parkir), menu mobile overlay gelap,
  tombol back-to-top.

## [1.0.0] - 2026-04-26

### Added
- Landing page statis awal: hero, suasana (bento grid), menu 6 kartu,
  info & reservasi, footer, tombol WhatsApp mengambang, animasi reveal.
- LICENSE MIT.
