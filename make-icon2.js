const { createCanvas } = require('canvas');
const fs = require('fs');

// Create a 56x56 canvas (ZeppOS icon size)
const size = 56;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Clear canvas with transparency
ctx.clearRect(0, 0, size, size);

// Draw a blue circle with "P"
ctx.beginPath();
ctx.arc(size/2, size/2, size/2 - 2, 0, Math.PI * 2);
ctx.fillStyle = '#0078FF';
ctx.fill();

// Add text "P"
ctx.fillStyle = 'white';
ctx.font = 'bold 32px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('P', size/2, size/2);

// Save as RGB PNG with transparency
const buffer = canvas.toBuffer('image/png', {
  compressionLevel: 9,
  filters: canvas.PNG_FILTER_NONE,
  resolution: 72,
  background: [255, 255, 255, 0] // transparent
});

// Write to both locations
fs.writeFileSync('icon.png', buffer);
fs.writeFileSync('assets/gt.r/icon.png', buffer);
fs.writeFileSync('assets/gt.s/icon.png', buffer);