type Locale = 'en' | 'it';

export const getDictionary = async (locale: Locale) => {
  const dictionary = await import(`./dictionaries/${locale}.json`);
  return dictionary.default;
};
