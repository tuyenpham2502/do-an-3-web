# Active Context

## Current Focus
- Language functionality for the settings page has been addressed.
- Consolidating i18n translation files.

## Recent Changes
1. Resolved language issue in `src/presentation/pages/setting/index.tsx`:
   - Identified duplicate i18n configurations and misplaced translation files.
   - Moved `settings` translations from `src/presentation/providers/i18n/locales/` to `src/shared/i18n/locales/`.
   - Removed the redundant `src/presentation/providers/i18n/` directory.

## Active Files
- `src/presentation/pages/setting/index.tsx` - Settings page component
- `src/shared/i18n/i18n.ts` - Main i18n configuration
- `src/shared/i18n/locales/en/common.json` - English translation file
- `src/shared/i18n/locales/vi/common.json` - Vietnamese translation file

## Next Steps
1. Verify language functionality on the settings page.
2. Continue with previous task of developing the user profile page.