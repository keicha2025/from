# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-02-14

### Added
- Customized UI components (Checkbox, Dialog, Switch, Confirm Dialog) following M3 design guidelines.
- Form result preview page with screenshot instruction for LINE service.
- Google Apps Script (GAS) `code.gs` and `init_sheets.gs` for backend integration.
- Remote access support for development server.

### Changed
- Updated `CustomCheckbox` styling to use `obsidian` color for checked state.
- Enhanced form submission logic to prevent duplicate submissions and provide visual feedback.

---
本次更新實作了符合 M3 規範的品牌元件，新增了表單預覽頁面與 GAS 串接功能，並支援行動端對外連線檢視。

## [1.1.0] - 2026-02-15

### Fixed
- Resolved Tailwind CSS v4 and PostCSS configuration errors by installing `@tailwindcss/postcss` and updating `postcss.config.js`.
- Fixed `ReferenceError: Send is not defined` in `ConfirmDialog`.

### Added
- Implemented custom `AlertDialog` component to replace native browser `alert()` for better brand consistency.
- Added copy-to-clipboard functionality for the LINE ID in the preview page.
- Added "NT$ 1500 (Landing Page only)" budget option.

### Changed
- Refactored `App.jsx` UI structure based on user-provided demo template.
- Updated multiple UI labels: "聯繫資訊" to "聯絡管道", "投資級距" to "預算範圍", and others.
- Optimized checkbox styles to remove checked background colors, preventing visual overlapping.
- Updated the data interaction levels and account policy descriptions with precise user-provided text.
- Integrated the official Google Apps Script deployment URL.
- Removed all periods ("。") from the user interface text for a concise look.

### Technical Details
- **Affected Files**: `App.jsx`, `index.css`, `postcss.config.js`, `package.json`.
- **Side Effects**: None expected; UI consistency improved.

---
本次重構了整體 UI 結構以符合範本，修補了 Tailwind 4 的相容性問題，並將所有提示視窗改為自定義組件，同時根據需求修正了大量文案與功能細節。

## [1.1.1] - 2026-02-15

### Fixed
- Removed `node_modules` from remote repository tracking to optimize repository size.
- Added `.gitignore` file to prevent tracking of build artifacts and environment files.

### Technical Details
- **Affected Files**: `.gitignore`.
- **Side Effects**: Cleaner repository structure.

---
新增了 .gitignore 並移除遠端倉庫中不必要的 node_modules 以優化專案體積。
