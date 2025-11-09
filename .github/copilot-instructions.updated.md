## Quick orientation — what an AI agent needs to know

This is a small ZeppOS Mini Program (Amazfit Bip 6 / target `gt`). Key surfaces:

- Root config: `app.json` — controls targets, platforms, pages, and runtime API. Important fields: `configVersion`, `vender`, `runtime.apiVersion`, `targets.*.module.page.pages`, `targets.*.platforms[].deviceSource`, and `designWidth`.
- Pages: `page/<target>/<feature>/index.page.js` — export `Page({ build(){...} })`. Home is `page/gt/home`; Search is `page/gt/search` (mocked UI lives in `page/gt/search/mock-data.js`).
- Layouts: per-platform `index.page.s.layout.js` and `index.page.r.layout.js`. Pages import with the loader alias: `import { X } from "zosLoader:./index.page.[pf].layout.js"`. BOTH variants must export the same symbols.
- Utilities: `utils/index.js` (e.g. `assets(type)(path)`) and `page/i18n/*.po` for localization.

Why these choices matter

- The Zepp toolchain validates `app.json` strictly. We fixed previous schema issues by adding `vender`, converting `targets.gt.module` to `module.page.pages`, adding `designWidth`, and supplying `platforms[].deviceSource` (Bip 6 uses 9765120/9765121/10158337; repo uses 9765121).
- UI sizing uses `px()` and `designWidth` — set `designWidth` under the target to match your design (390 is a reasonable start for Bip 6).
- Layout symbols must be consistent across `.s` and `.r` variants. A common Rollup error is: `"X is not exported by Y"` — fix by exporting the same constants in both layout files.

Developer workflows (commands & quick debug)

- Start dev watcher (Zeus):
  - `npx @zeppos/zeus-cli dev`
  - `npx @zeppos/zeus-cli dev --clearCache` (if stale cache)
- Quick click debug: add `hmUI.showToast({ text: "Tapped" })` inside button handlers to confirm input events.

Common build errors and minimal fixes

- "app requires property 'vender'" → add `"vender": "YourName"` to `app.json`.
- "App V2 must have deviceSource in platform" → add `"deviceSource": <number>` to the `platforms` entry for the target (we used 9765121 for Bip 6).
- "X is not exported by Y" → ensure both `index.page.s.layout.js` and `.r` export the same constant (we added `TEXT_STYLE` to the `.s` layout to match `.r`).
- Page path not found → use canonical page path strings without file suffix, e.g. `page/gt/search/index` in `app.json` and `hmApp.gotoPage`.

Project-specific examples

- Navigation: `hmApp.gotoPage({ url: "page/gt/search/index" })` (see `page/gt/home/index.page.js`).
- Layout import: `import { TEXT_STYLE } from "zosLoader:./index.page.[pf].layout.js"` (see `page/gt/home`).
- Mock data: `page/gt/search/mock-data.js` provides example PinTips used by `page/gt/search/index.page.js`.

Files to inspect first when debugging

- `app.json` (schema, pages, platforms.deviceSource, designWidth)
- `page/gt/home/index.page.js` and `page/gt/search/index.page.js` (navigation and page exports)
- `page/gt/*/index.page.s.layout.js` and `.r.layout.js` (matching exports)
- `utils/index.js` (assets helper) and `page/gt/search/mock-data.js` (example data)

If you want this to replace the existing `.github/copilot-instructions.md` I created earlier, say "Replace" and I'll swap it in; otherwise we can iterate on this draft here. If you'd like, I can also add an exact canonical `app.json` template and a tiny network-stub helper next.
