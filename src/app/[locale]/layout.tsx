export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const resolvedParams = await params; // Await params if it's a promise
  return (
    <html lang={resolvedParams.locale}>
      <body>{children}</body>
    </html>
  );
}
