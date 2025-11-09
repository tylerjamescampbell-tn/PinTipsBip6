// Base64 encoded icon from a working ZeppOS sample app
// Small, solid color icon that's known to work with their toolchain
const fs = require('fs');

const iconData = `
iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE6SURB
VGiB7ZjbDYMwDEXvLdAROkJH6AgdoSN0hI7QEbLBmxvFspDFQ0kcO0GqfKQIgsA+OI5tkhBCCGkO
ABeS69q6ZPfpGnaua+uR3T2O+nXQZ/ep/r3k7lO+H8nuB7IbABzIvtn99xDsmrQgdazJ7qvPDgAO
1dXXsGKKgd0JwNn9cwAOC90BAAfbE4BtrdVXZYYz3O6ZqjCYMB6m+Isz7UYDUV2caTeasCpO266q
OK3B4cUp200Sp20XkhfmxB0BbOba/TeuAJZ8vtdXqooTQgjxgeQNwL22jhoAHElO1dSFEOnmJJEO
2XdtPbL7dDWP5ImkWVtXqXlmuCecXV4T5wXbfG8vqgZ1PUrOShcALyQ/td2FEEKIFzVXrrrUXLmS
gm8S0oXkh+SL5I3kxPNXIYQQQhbiC6YpWsn+7A4qAAAAAElFTkSuQmCC`;

const iconBuffer = Buffer.from(iconData, 'base64');

// Write to both locations
fs.writeFileSync('icon.png', iconBuffer);
fs.writeFileSync('assets/gt.r/icon.png', iconBuffer);
fs.writeFileSync('assets/gt.s/icon.png', iconBuffer);