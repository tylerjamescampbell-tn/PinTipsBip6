# ZeppOS Mini Program for Amazfit Bip 6 - AI Agent Guide

## Project Overview
This is **PinTipZ**, a ZeppOS Mini Program targeting Amazfit Bip 6 (`gt` target). It's a tournament-focused pinball tips app that integrates with MatchPlay API to help players quickly access machine-specific tips during live tournaments.

### Core User Flow
1. **Find Tournament**: Enter tournament ID to connect to active MatchPlay tournament
2. **Browse Games**: View list of machines/games in the tournament
3. **Get Tips**: Select specific machine to view curated PinTips for that game
4. **Quick Access**: Seamless watch-based interface for mid-tournament use

## Critical Architecture Patterns

### App Configuration (`app.json`)
The Zepp toolchain validates strictly. Current working config uses:
- `configVersion: "v2"` with both `vendor` AND `vender` fields (legacy requirement)
- `targets.gt.module.designWidth: 390` for Bip 6 screen sizing
- `targets.gt.platforms[].deviceSource: 9765121` (Bip 6 device ID)
- Page paths without `.js` suffix: `"page/gt/home/index"`

### Dual-Layout System
Each page has **two layout files** that must export identical symbols:
- `index.page.s.layout.js` (square/vertical orientation) 
- `index.page.r.layout.js` (round/horizontal orientation)
- Import via loader: `import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js"`
- **Critical**: Mismatched exports cause `"X is not exported by Y"` build errors

### Page Structure
Pages export `Page({ build() {...} })` and use ZeppOS UI widgets:
```javascript
// Navigation pattern
hmApp.gotoPage({ url: "page/gt/search/index" });

// Widget creation
hmUI.createWidget(hmUI.widget.BUTTON, { /* config */ });

// Event handling with debug toast
btn.addEventListener(hmUI.event.CLICK, () => {
  hmUI.showToast({ text: "Tapped" });  // Debug pattern
});
```

### Data Layer & API Integration
- **MatchPlay Integration**: Connect to MatchPlay API for tournament and game data
- **Mock-first development**: `utils/network.js` returns mock data by default for offline dev
- **PinTips Database**: Fetch machine-specific tips from curated database
- Built-in caching (60s TTL) and automatic fallback to mocks on network failure
- Tournament data includes: ID, game list, machine names/types

### Planned Page Structure
- **Home**: Tournament ID entry and connection status
- **Tournament**: Game list view for selected tournament  
- **Machine**: Tips display for specific pinball machine
- **Search**: Alternative browse/search interface for games

## Development Workflow

### Build & Dev Commands
```bash
# Start dev server with file watching
npx @zeppos/zeus-cli dev

# Clear cache if builds act stale
npx @zeppos/zeus-cli dev --clearCache
```

### Debug Techniques
- Add `hmUI.showToast({ text: "Debug message" })` for quick click confirmation
- Use `getDeviceInfo()` for responsive sizing: `const { width: W, height: H } = getDeviceInfo()`
- Layout debugging: check both `.s` and `.r` variants export same constants

## Common Build Errors & Fixes

| Error | Fix |
|-------|-----|
| `"app requires property 'vender'"` | Add both `"vendor"` and `"vender"` to `app.json` |
| `"App V2 must have deviceSource in platform"` | Add `"deviceSource": 9765121` to platforms array |
| `"X is not exported by Y"` | Ensure both layout files export the same symbols |
| Page navigation fails | Use paths without `.js`: `"page/gt/search/index"` |

## Key Files to Understand

**Configuration:**
- `app.json` - App metadata, page routing, platform targets
- `package.json` - Dependencies (@zeppos/device-types, @zeppos/zml)

**Core Pages:**
- `page/gt/home/index.page.js` - Tournament ID entry and "Find Tournament" 
- `page/gt/search/index.page.js` - Game list from MatchPlay tournament
- `page/gt/machine/index.page.js` - (Planned) Individual machine tips display
- `page/gt/tournament/index.page.js` - (Planned) Tournament overview

**Utilities:**
- `utils/network.js` - MatchPlay API integration with mock fallbacks
- `utils/index.js` - Asset path helper: `assets("gt")("icon.png")`
- `page/i18n/*.po` - Localization files (en-US, zh-CN)

**Data Sources:**
- MatchPlay API endpoints for tournament data
- PinTips database for machine-specific strategy content
- Mock data in `page/gt/search/mock-data.js` for offline development

**Layout Examples:**
- Compare `page/gt/home/index.page.s.layout.js` vs `.r.layout.js` for dual-screen pattern
