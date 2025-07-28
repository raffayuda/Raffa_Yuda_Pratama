# Setup Gmail App Password untuk Contact Form

## Langkah-langkah untuk membuat Gmail App Password:

### 1. Aktifkan 2-Factor Authentication (2FA)
- Buka [Google Account Security](https://myaccount.google.com/security)
- Pastikan 2-Factor Authentication sudah aktif
- Jika belum, aktifkan terlebih dahulu

### 2. Generate App Password
- Masih di halaman Google Account Security
- Cari bagian "2-Step Verification"
- Klik "App passwords" (atau "Passwords for apps")
- Pilih "Mail" sebagai app
- Pilih "Other (custom name)" sebagai device
- Masukkan nama: "Portfolio Contact Form"
- Klik "Generate"

### 3. Copy App Password
- Google akan memberikan password 16 karakter (contoh: abcd efgh ijkl mnop)
- Copy password ini (tanpa spasi)

### 4. Update .env file
```bash
EMAIL_PASS="abcdefghijklmnop"  # Ganti dengan app password yang didapat
```

### 5. Alternative: Gunakan OAuth2 (Lebih Aman)
Jika App Password tidak bekerja, kita bisa setup OAuth2:

```typescript
// Alternative configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'raffayudapratama20@gmail.com',
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
})
```

## Testing
Setelah setup App Password:
1. Restart development server
2. Test contact form
3. Check console logs untuk debug info

## Common Issues:
- "Invalid login" → Check app password is correct
- "Authentication failed" → Verify 2FA is enabled
- "Access denied" → Check Gmail security settings
