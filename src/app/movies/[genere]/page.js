// app/movies/[genere]/page.js

export default async function GenerePage({ params }) {
  const { genere } = await params;

  return (
    <div>
      <h1>Categoria: {genere}</h1>
      <h2>Item: {genere}</h2>
    </div>
  );
}
