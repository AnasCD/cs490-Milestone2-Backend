import React, { useEffect, useState } from 'react';

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFilms = (pageNumber, search) => {
    let url;

    if (search) {
        url = `http://localhost:5000/api/films-page/search?search=${search}&page=${pageNumber}&limit=10`;
    } else {
        url = `http://localhost:5000/api/films-page?page=${pageNumber}&limit=10`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setFilms(data.films || []);
            setTotalPages(Math.ceil(data.totalFilms / 10));
        })
        .catch((error) => console.error("Error fetching films:", error));
};

  useEffect(() => {
    fetchFilms(page, searchTerm);
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Films</h1>

      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Search by Film Name, Actor, or Genre"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <ul className="list-disc pl-6">
        {films.map((film) => (
          <li key={film.film_id} className="mb-2">
            <p>
              <strong>ID:</strong> {film.film_id} <br />
              <strong>Title:</strong> {film.title} <br />
              <strong>Genre:</strong> {film.genre} <br />
            </p>
          </li>
        ))}
      </ul>

      <div className="join mt-6">
        <button
          className={`join-item btn ${page === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`join-item btn ${page === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FilmsPage;
