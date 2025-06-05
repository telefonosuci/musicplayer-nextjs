// pages/api/movies.js
import { getConnection } from '../../../lib/db'; // adjust the path if needed

export default async function all(req, res) {
  let db;
  try {
    db = await getConnection();
    const [rows] = await db.execute('SELECT * FROM movies');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (db) {
      await db.end();
    }
  }
}