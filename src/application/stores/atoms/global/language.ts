import { atomWithStorage } from 'jotai/utils';

export type Language = 'en' | 'vi';

export const languageAtom = atomWithStorage<Language>('language', 'en');
