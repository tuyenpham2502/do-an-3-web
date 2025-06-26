# Active Context

## Current Focus
- Language functionality for the settings page has been addressed.
- Consolidating i18n translation files.
- Improved UI for the Dashboard page, specifically the pump status switch and its positioning.
- Added new translation keys for pump status and auto warning.

## Recent Changes
1. Resolved language issue in `src/presentation/pages/setting/index.tsx`:
   - Identified duplicate i18n configurations and misplaced translation files.
   - Moved `settings` translations from `src/presentation/providers/i18n/locales/` to `src/shared/i18n/locales/`.
   - Removed the redundant `src/presentation/providers/i18n/` directory.
2. Improved UI for `src/presentation/pages/dashboard/index.tsx`:
   - Enhanced overall layout and spacing.
   - Applied modern styling to sensor data cards.
   - Increased the size and clarity of the pump status switch.
   - Repositioned the pump status switch section to be below the sensor data cards.
   - Added a new switch for auto warning.
3. Added `on`, `off`, and `pumpStatus` translation keys to `src/shared/i18n/locales/en/common.json` and `src/shared/i18n/locales/vi/common.json`.
4. Added `autoWarning` translation key to `src/shared/i18n/locales/en/common.json` and `src/shared/i18n/locales/vi/common.json`.

## Active Files
- `src/presentation/pages/setting/index.tsx` - Settings page component
- `src/shared/i18n/i18n.ts` - Main i18n configuration
- `src/shared/i18n/locales/en/common.json` - English translation file
- `src/shared/i18n/locales/vi/common.json` - Vietnamese translation file
- `src/presentation/pages/dashboard/index.tsx` - Dashboard page component

## Next Steps
1. Verify language functionality on the settings page.
2. Continue with previous task of developing the user profile page.