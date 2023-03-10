import en from '@src/i18n/languages/en.json';
import fr from '@src/i18n/languages/fr.json';

type LanguageObjectType = keyof typeof fr;

const Localization = (key: LanguageObjectType): string => {
  return key;
};
export {en, fr, Localization};
