import { getConnection } from '../../../../../lib/db'; // adjust the path if needed

export default async function byGenre(req, res) {
  const { genere } = req.query;
  const db = await getConnection();

  const [rows] = await db.execute('SELECT * FROM movies WHERE genre = ?', [genere]);
  await db.end();

  if (rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: 'No movies found for this genre' });
  }
}
