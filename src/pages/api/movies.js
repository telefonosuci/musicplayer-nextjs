// pages/api/movies.js
import { getConnection } from '../../lib/db'; // adjust the path if needed

export default async function handler(req, res) {
  const db = await getConnection();

  const [rows] = await db.execute('SELECT * FROM movies');
  await db.end();

  res.status(200).json(rows);
}