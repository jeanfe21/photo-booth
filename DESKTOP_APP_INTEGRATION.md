# Desktop App Integration

## Deep Link Protocol

Ketika voucher berhasil diverifikasi, aplikasi web akan mencoba membuka aplikasi desktop menggunakan custom protocol.

### Protocol Format

```
photobooth://session/VOUCHER_CODE
```

Contoh:
- `photobooth://session/PB-AB12CD`
- `photobooth://session/VOUCHER123`

## Implementation

### Web Side (Current Implementation)

File: `components/booth/voucher-input.tsx`

```typescript
function openDesktopApp(voucherCode: string) {
  try {
    // Try to open desktop app with custom protocol
    window.location.href = `photobooth://session/${voucherCode}`
  } catch (error) {
    console.error("Failed to open desktop app:", error)
  }
}
```

**Behavior:**
- Mencoba membuka desktop app dengan deep link
- Jika desktop app tidak terinstall, fallback ke web version setelah 500ms
- Voucher code dikirim sebagai parameter di URL

### Desktop App Side (Required Setup)

Desktop app perlu mendaftarkan custom protocol handler.

#### Windows (using Electron)

Daftarkan di `package.json`:

```json
{
  "protocols": [
    {
      "name": "photobooth",
      "schemes": ["photobooth"]
    }
  ]
}
```

Atau di `main.js`:

```javascript
app.setAsDefaultProtocolClient('photobooth')

app.on('open-url', (event, url) => {
  event.preventDefault()
  
  // Parse URL: photobooth://session/VOUCHER_CODE
  const urlObj = new URL(url)
  const voucherCode = urlObj.pathname.split('/')[1]
  
  // Handle voucher code
  handleVoucherCode(voucherCode)
})
```

#### macOS (using Electron)

Daftarkan di `package.json`:

```json
{
  "build": {
    "protocols": [
      {
        "name": "photobooth",
        "schemes": ["photobooth"]
      }
    ]
  }
}
```

Atau di `main.js`:

```javascript
app.setAsDefaultProtocolClient('photobooth')

// For macOS
app.on('open-url', (event, url) => {
  event.preventDefault()
  
  // Parse URL: photobooth://session/VOUCHER_CODE
  const urlObj = new URL(url)
  const voucherCode = urlObj.pathname.split('/')[1]
  
  handleVoucherCode(voucherCode)
})

// For Linux (if needed)
app.on('second-instance', (event, argv) => {
  const url = argv.find(arg => arg.startsWith('photobooth://'))
  if (url) {
    const urlObj = new URL(url)
    const voucherCode = urlObj.pathname.split('/')[1]
    handleVoucherCode(voucherCode)
  }
})
```

#### Alternative: Native App (Windows)

Registry entry untuk Windows:

```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Classes\photobooth]
"URL Protocol"=""
@="PhotoBooth Protocol"

[HKEY_CURRENT_USER\Software\Classes\photobooth\shell]

[HKEY_CURRENT_USER\Software\Classes\photobooth\shell\open]

[HKEY_CURRENT_USER\Software\Classes\photobooth\shell\open\command]
@="\"C:\\Path\\To\\PhotoBooth.exe\" \"%1\""
```

#### Alternative: Native App (macOS)

Info.plist entry:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.yourcompany.photobooth</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>photobooth</string>
    </array>
  </dict>
</array>
```

## Flow Diagram

```
User Input Voucher
       ↓
Verify with API (/api/vouchers/verify)
       ↓
Voucher Valid?
       ↓
Yes → Open Desktop App (photobooth://session/CODE)
       ↓
Wait 500ms
       ↓
Open Web Fallback (/booth/app)
```

## Testing

### Test Deep Link (macOS)

```bash
open "photobooth://session/TEST123"
```

### Test Deep Link (Linux)

```bash
xdg-open "photobooth://session/TEST123"
```

### Test Deep Link (Windows PowerShell)

```powershell
Start-Process "photobooth://session/TEST123"
```

### Browser Test

Jalankan di browser console:

```javascript
window.location.href = "photobooth://session/TEST123"
```

## Security Considerations

1. **Voucher Validation**: Desktop app harus juga validate voucher dengan server
2. **Timeout**: Deep link tidak boleh di-trust tanpa server validation
3. **Error Handling**: Handle case ketika protocol not registered
4. **User Feedback**: Tampilkan loading state saat membuka desktop app

## Fallback Strategy

Current implementation:
1. Coba buka desktop app
2. Setelah 500ms, buka web version sebagai fallback
3. Jika desktop app terbuka, user akan menggunakan desktop version
4. Jika tidak, user akan melihat web version

Alternative (lebih baik):
1. Prompt user untuk install desktop app jika belum ada
2. Atau redirect langsung ke web jika desktop app tidak terdeteksi

## Next Steps

Untuk implementasi lengkap:

1. **Build Desktop App** dengan Electron/TAURI/atau framework lain
2. **Register Protocol** di OS target
3. **Parse Deep Link** untuk extract voucher code
4. **Validate dengan Server** (jangan trust client-side validation)
5. **Handle Errors** gracefully
6. **Test** di berbagai OS dan browser

