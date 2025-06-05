import { getSlugKeyFromTranslated } from '@/i18n/slugs';
import { getDictionary } from '@/i18n/getDictionary';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};



export default async function Page({ params }: Props) {
  const { locale, slug } = await params;

  const pageKey = getSlugKeyFromTranslated(slug, locale);
  if (!pageKey) return notFound();


  const t = await getDictionary(locale as 'en' | 'it');


  return (
    <div>
      <h1>{pageKey.toUpperCase()} page</h1>
      <p>Lingua attiva: {locale}</p>

      <h2>{t.title}</h2>
      <p>{t.description}</p>
    </div>
  );
}
