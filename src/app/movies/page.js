
import React from 'react';

async function fetchMovies() {
  const res = await fetch('http://localhost:3000/api/movies', {
    cache: 'no-store', // ensures fresh data on each request (SSR)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  const movies = await res.json();
  return movies;
}

async function MoviesPage() {

  const movies = await fetchMovies();

  return (
    <div>

      <h3 className="text-2xl font-semibold mb-4">Popolari</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">


              {movies.map((movie) => (

                  <a key={movie.ID} href={`/movies/${movie.ID}`} className="block mb-4">
                  <div className="relative group">
                    <img src="https://placehold.co/300x400" alt="Titolo Film" className="rounded-lg group-hover:opacity-80 transition duration-300" />
                    <div className="absolute bottom-2 left-2 text-sm bg-black bg-opacity-60 px-2 py-1 rounded">{movie.title}</div>
                  </div>
                  </a>

              ))}


          </div>







    </div>
  );
}

export default MoviesPage;
