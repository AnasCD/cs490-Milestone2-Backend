import React, { useEffect, useState } from 'react';

function LandingPage() {
  const [top5Films, setTop5Films] = useState([]);
  const [top5Actors, setTop5Actors] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTop5Films(data.top5Films);
        setTop5Actors(data.top5Actors);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const fetchFilmDetails = (id) => {
    fetch(`http://localhost:5000/api/films/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setSelectedFilm(data))
      .catch((error) => console.error('Error fetching film details:', error));
  };


  const fetchActorDetails = (id) => {
    fetch(`http://localhost:5000/api/actors/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setSelectedActor(data))
      .catch((error) => console.error('Error fetching actor details:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Top 5 Rented Films</h1>
      <ul className="list-disc pl-6">
        {top5Films.map((film) => (
          <li key={film.film_id} className="mb-2">
            <button
              onClick={() => fetchFilmDetails(film.film_id)}
              className="text-blue-500 underline"
            >
              {film.title}
            </button>
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-bold mt-6 mb-4">Top 5 Actors</h1>
      <ul className="list-disc pl-6">
        {top5Actors.map((actor) => (
          <li key={actor.actor_id} className="mb-2">
            <button
              onClick={() => fetchActorDetails(actor.actor_id)}
              className="text-blue-500 underline"
            >
              {actor.first_name} {actor.last_name}
            </button>
          </li>
        ))}
      </ul>

      {selectedFilm && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">{selectedFilm.title}</h2>
          <p><strong>Description:</strong> {selectedFilm.description || 'N/A'}</p>
          <p><strong>Release Year:</strong> {selectedFilm.release_year || 'N/A'}</p>
          <p><strong>Rental Duration:</strong> {selectedFilm.rental_duration || 'N/A'} days</p>
          <p><strong>Rental Rate:</strong> ${selectedFilm.rental_rate || 'N/A'}</p>
          <p><strong>Length:</strong> {selectedFilm.length || 'N/A'} minutes</p>
          <p><strong>Replacement Cost:</strong> ${selectedFilm.replacement_cost || 'N/A'}</p>
          <p><strong>Rating:</strong> {selectedFilm.rating || 'N/A'}</p>
          <p><strong>Special Features:</strong> {selectedFilm.special_features || 'N/A'}</p>
          <p><strong>Last Updated:</strong> {selectedFilm.last_update ? new Date(selectedFilm.last_update).toLocaleDateString() : 'N/A'}</p>
        </div>
      )}

      {selectedActor && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">
            {selectedActor.actorDetails.first_name} {selectedActor.actorDetails.last_name}
          </h2>
          <h3 className="font-bold">Top 5 Movies:</h3>
          <ul className="list-disc pl-6">
            {selectedActor.topMovies.map((movie) => (
              <li key={movie.film_id}>
                {movie.title} (Rentals: {movie.rentals})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
