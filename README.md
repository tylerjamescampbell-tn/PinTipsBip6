# PinTipsBip6
Attempts to get a PinTips app working on a Bip 6

## PinTipz v2

This repository contains the PinTipz v2 application - a ZeppOS app designed for the Amazfit Bip 6 smartwatch.

### Features
- Home page for main interface
- Search functionality for finding pin locations
- Machine page for managing pin details
- Multi-language support (English and Chinese)
- Responsive layouts for different watch models

### Structure
- `app.js` - Main application entry point
- `app.json` - Application configuration
- `page/` - Application pages (home, search, machine)
- `assets/` - Icons and images for different watch models
- `utils/` - Utility functions including network operations
- `package.json` - Node.js dependencies

### Setup
To develop or build this application, you'll need to install the dependencies:
```bash
npm install
```

Note: This app requires ZeppOS development tools and is configured for the hm5 device (Amazfit Bip 6).
