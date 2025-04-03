
export const dynamic = 'force-dynamic'; // prevents build-time prerendering
import React from 'react';
import { getConnection } from '../../lib/db'; // adjust the path if needed


async function fetchMovies() {
  const connection = await getConnection();

  const [rows] = await connection.execute('SELECT * FROM movies');
  return rows;
}

async function MoviesPage() {

  const movies = await fetchMovies();

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <div>{movie.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;
