export const translatedSlugs = {
  about: {
    en: 'about',
    it: 'chi-siamo',
  },
  contact: {
    en: 'contact',
    it: 'contatti',
  },
};

export function getSlugKeyFromTranslated(slug: string, locale: string) {
  return Object.keys(translatedSlugs).find(
    (key) => translatedSlugs[key][locale] === slug
  );
}