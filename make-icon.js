const fs = require('fs');
const { PNG } = require('pngjs');

const size = 56; // ZeppOS recommended icon size
const png = new PNG({ width: size, height: size });
const bgColor = { r: 0, g: 120, b: 255, a: 255 }; // blue

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const idx = (size * y + x) << 2;
    png.data[idx] = bgColor.r;
    png.data[idx + 1] = bgColor.g;
    png.data[idx + 2] = bgColor.b;
    png.data[idx + 3] = bgColor.a;
  }
}

png.pack().pipe(fs.createWriteStream('assets/gt.r/icon.png'));