# Rental Mobil — Production Ready
Peran: Full-stack
Stack: React, Node/Express, Prisma, Midtrans

Fitur utama:
- Pembayaran Midtrans Snap production, webhook + signature verification, idempotent status.
- Admin sederhana: Orders, Cars, Settings.
- Duplicate payment guard, manual verify endpoint /api/orders/:id/verify.
- Invoice otomatis ke WhatsApp/email setelah pembayaran sukses.
- Strict CORS, toggle logging, siap deploy FE/BE.

Status: Menuju go live (tahap produksi kunci dan webhook).
Hasil yang diincar: booking → bayar → invoice mulus tanpa intervensi manual.
