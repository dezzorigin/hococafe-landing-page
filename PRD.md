# PRD — Hoco Coffee Landing Page (v2.0)

## 1. Informasi Proyek

| Field | Nilai |
|---|---|
| Nama Proyek | Hoco Coffee — Landing Page |
| Subjek | Hoco Coffee Lambhuk, Banda Aceh (kafe WFC, nongkrong, drive-thru) |
| Tech Stack | HTML5 + Tailwind Play CDN + JavaScript vanilla (satu file, tanpa build) |
| Status | Live di https://hococafe.pages.dev |
| Penanggung Jawab | Nabil Aulia Dika (dezzorigin) |
| Versi Dokumen | 2.0 (18 Nov 2026) — ditulis ulang jujur dari isi repo sebenarnya |
| Lisensi | MIT |

## 2. Latar Belakang

Hoco Coffee Lambhuk adalah kafe di Banda Aceh yang menjual suasana kerja
(WFC), nongkrong, dan drive-thru. Landing page ini adalah satu-satunya
etalase digitalnya: pengunjung harus bisa, dalam satu guliran, tahu kafe ini
apa, lihat menunya, cek sedang buka atau tutup, lalu pesan atau reservasi
lewat WhatsApp. Tidak ada sistem pemesanan sendiri — WhatsApp adalah
satu-satunya jalur transaksi.

## 3. Masalah yang Diselesaikan

- Calon pengunjung tidak tahu kafe sedang buka/tutup saat membuka halaman →
  status live dihitung dari jam operasional (WIB).
- Menu sulit dicari → filter kategori Kopi / Non-Kopi / Makanan / Dessert.
- Pertanyaan berulang (WiFi? reservasi VIP? drive-thru? bayar pakai apa?) →
  FAQ interaktif + seksi info.
- Pengunjung mobile harus mudah pesan → tombol WhatsApp mengambang + menu mobile.

## 4. Tujuan & Sasaran

- Satu halaman, muat cepat, bisa dibuka dari HP maupun desktop.
- Semua CTA mengarah ke WhatsApp kafe (0812-6406-5722) atau Google Maps.
- Status buka/tutup benar di zona waktu pengunjung mana pun.
- Nol error HTML (html-validate), nol console error.

## 5. Ruang Lingkup

### In Scope
- Hero, suasana (bento grid), menu + filter, ulasan, FAQ, info & reservasi, footer.
- Status buka/tutup live (JS, zona Asia/Jakarta).
- Animasi reveal, menu mobile, back-to-top, tombol WA mengambang.
- CI: html-validate + markdown-link-check + smoke test.
- Deploy Cloudflare Pages + About homepage repo.

### Out of Scope
- Pemesanan/checkout online, keranjang, pembayaran di halaman.
- Backend, database, akun pengguna.
- Foto asli kafe (pakai Unsplash stok — lihat § Batasan di README).
- Peta tertanam (hanya tombol tautan ke Google Maps).

## 6. Fitur & Persyaratan Fungsional

| # | Fitur | Perilaku |
|---|---|---|
| 1 | Hero | Judul, subjudul, 2 CTA (Lihat Menu, Pesan Drive-thru), bar statistik, badge status |
| 2 | Status live | Nav, hero, dan menu mobile menampilkan Buka/Tutup + jam buka berikutnya; dihitung dari `Intl.DateTimeFormat` zona Asia/Jakarta; refresh tiap 60 detik |
| 3 | Suasana | Bento grid 4 kartu: vibe, fasilitas WFC, parkir, layanan |
| 4 | Menu | 6 kartu (2 kopi, 1 non-kopi, 2 makanan, 1 dessert) + filter 5 tombol (Semua + 4 kategori); kartu yang difilter tampil dengan animasi fadeIn |
| 5 | Ulasan | 3 kartu testimoni statis |
| 6 | FAQ | 4 item accordion; hanya satu terbuka dalam satu waktu |
| 7 | Info & reservasi | Tabel jam operasional (Sen–Kam 08:00–23:30, Jum 14:00–23:30, Sab–Min 07:00–23:30), kartu pembayaran, CTA reservasi WA |
| 8 | Footer | Kontak (telp, IG, email), alamat + tombol rute Google Maps, tautan GitHub repo |
| 9 | Navigasi | Navbar kaca (glass) + logo GitHub kanan, menu mobile overlay gelap, back-to-top muncul setelah scroll 400px |

## 7. Persyaratan Non-Fungsional

- **Performa:** satu file HTML; aset eksternal hanya CDN (Tailwind, FontAwesome, Google Fonts) + foto Unsplash. Tidak ada target skor Lighthouse di CI — skor ditentukan CDN, bukan kode repo (lihat `docs/architecture.md`).
- **Responsif:** layout diuji 390px (mobile) dan 1280px (desktop); tanpa overflow horizontal.
- **Aksesibilitas:** tombol punya `type="button"` dan `aria-label` bila ikon saja; `alt` pada semua foto; kontras teks di atas foto dijaga overlay gelap.
- **Keamanan:** tanpa secret; tanpa form yang mengirim data; semua tautan eksternal memakai `target="_blank"` + `rel="noopener"` bila ke domain lain.
- **Maintainability:** satu file, komentar seksi bernomor; smoke test menjaga konsistensi (nomor WA tunggal, kategori filter sinkron).

## 8. Arsitektur & Tech Stack

Satu file statis. Detail: `docs/architecture.md` + `docs/diagram.svg`.

## 9. Milestone

| Fase | Status |
|---|---|
| Landing awal (statis) | ✅ Apr 2026 (v1.0.0) |
| Redesign (filter, ulasan, FAQ, status live) | ✅ 26 Sep 2026 (v1.1.0) — dikerjakan di branch `feat/redesign-…`, tidak ter-merge; diselamatkan 18 Nov 2026 via cherry-pick |
| Proper: CI, docs jujur, deploy Pages, play-test | ✅ 18 Nov 2026 (v1.2.0) |

## 10. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Tailwind Play CDN mati/lambat → halaman tanpa gaya | Risiko diterima: CDN adalah arsitektur halaman ini; tidak ada build step yang bisa men-vendor-kan-nya tanpa mengubah alur kerja |
| Foto Unsplash dihapus/berubah | `loading="lazy"` + `alt`; foto adalah ilustrasi, bukan data |
| Jam operasional berubah, status salah | Jam hanya ada di satu tempat (tabel + logika JS memakai tabel yang sama); smoke test tidak bisa memvalidasi kebenaran jam — sumber kebenaran adalah kafe |
| Nomor WA berubah | Semua 12 tautan `wa.me` memakai satu nomor; smoke test gagal bila ada nomor berbeda |

## 11. Kriteria Keberhasilan

- Halaman live HTTP 200, semua section render, 0 console error.
- Filter menu: tiap kategori menampilkan kartu yang benar.
- FAQ: klik membuka, klik lain menutup yang sebelumnya.
- Status: teks badge cocok dengan jam WIB saat dibuka.
- CI hijau (validate + links + smoke).
- README jujur: klaim tak terverifikasi dinyatakan sebagai klaim.

## 12. Lampiran

- Arsitektur: `docs/architecture.md`
- Diagram: `docs/diagram.svg`
- Lisensi: MIT (`LICENSE`)
