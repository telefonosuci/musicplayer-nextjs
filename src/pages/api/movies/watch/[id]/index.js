// pages/api/movies/[id]/index.js
import { getConnection } from '../../../../../lib/db'; // adjust the path if needed

export default async function single(req, res) {
  const { id } = req.query;
  const db = await getConnection();

  const [rows] = await db.execute('SELECT * FROM movies WHERE ID = ?', [id]);
  await db.end();

  if (rows.length > 0) {
    res.status(200).json(rows[0]);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
}