// Minimal icon generator - creates a tiny valid PNG
const fs = require('fs');

// Base64-encoded 16x16 blue square PNG (minimal valid PNG)
const minimalIcon = Buffer.from(`
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ
bWFnZVJlYWR5ccllPAAAALFJREFUeNpi/P//PwMlgImBQkBdA/7//78ZiDcDMQcQgwBrZGTkA6hB
l4G4EYj/QQ34D8RngNgBiI8AcQIQnwBiASBuB+JcIH4BxO+BWAOIN4A0A/EXIJ4FxEeA+AQQXwLi
jUB8FojfArEEED8BYgEgrgPiOiA+B8RfgNgOiF8BsQoQrwXiNCD+CcRbgPgpEPMB8UEg1gTiD0B8
FIhvALEPEL8DYnUgPgLEz6h6FigFAAEGAOLvV3cBgtPnAAAAAElFTkSuQmCC
`, 'base64');

fs.writeFileSync('icon.png', minimalIcon);