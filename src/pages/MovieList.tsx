import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import backgroundImage from "../assets/kino.webp";

const MovieList = () => {
  const { state, dispatch } = useMovieContext();
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    dispatch({ type: "APPLY_FILTERS_AND_SORT" });
  }, [state.sortType, state.filters, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const sortButtons = [
    { label: "Newest First", value: "year-desc" },
    { label: "Oldest First", value: "year-asc" },
    { label: "Highest Rating", value: "rating-desc" },
    { label: "Lowest Rating", value: "rating-asc" },
    { label: "A-Z", value: "title-asc" },
    { label: "Z-A", value: "title-desc" },
  ];

  const years = [...new Set(state.movies.map((movie) => movie.year))]
    .sort()
    .reverse();

  const allGenres = [
    ...new Set(state.movies.flatMap((movie) => movie.genre)),
  ].sort();

  const GenreModal = () => {
    if (!isGenreModalOpen) return null;

    return (
      <div className="modal-overlay" onClick={() => setIsGenreModalOpen(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Filter by Genre</h2>
            <button
              className="close-button"
              onClick={() => setIsGenreModalOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="modal-genres">
            <button
              className={`modal-genre-button ${
                !state.filters.genre ? "active" : ""
              }`}
              onClick={() => {
                dispatch({
                  type: "SET_FILTER",
                  payload: { genre: "" },
                });
                setIsGenreModalOpen(false);
              }}
            >
              All Genres
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                className={`modal-genre-button ${
                  state.filters.genre === genre ? "active" : ""
                }`}
                onClick={() => {
                  dispatch({
                    type: "SET_FILTER",
                    payload: { genre },
                  });
                  setIsGenreModalOpen(false);
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div
        className="page-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <h1>Movie Database</h1>

      <div className="filters">
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search movies..."
            value={state.filters.search}
            onChange={(e) =>
              dispatch({
                type: "SET_FILTER",
                payload: { search: e.target.value },
              })
            }
            className="search-input"
          />

          <select
            value={state.filters.year}
            onChange={(e) =>
              dispatch({
                type: "SET_FILTER",
                payload: { year: e.target.value },
              })
            }
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            className={`filter-button ${state.filters.genre ? "active" : ""}`}
            onClick={() => setIsGenreModalOpen(true)}
          >
            {state.filters.genre
              ? `Genre: ${state.filters.genre}`
              : "Filter by Genre"}
          </button>
        </div>
      </div>

      <GenreModal />

      <div className="sort-controls">
        <div className="sort-buttons">
          {sortButtons.map((button) => (
            <button
              key={button.value}
              className={`sort-button ${
                state.sortType === button.value ? "active" : ""
              }`}
              onClick={() =>
                dispatch({
                  type: "SET_SORT_TYPE",
                  payload: button.value as typeof state.sortType,
                })
              }
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="movie-grid">
        {state.filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-card-content">
              <h2>{movie.title}</h2>
              <div className="movie-info">
                <div className="info-row">
                  <span className="label">Year:</span>
                  <span className="value">{movie.year}</span>
                </div>
                <div className="info-row">
                  <span className="label">Rating:</span>
                  <span className="value rating">{movie.rate}</span>
                </div>
                <div className="info-row">
                  <span className="label">Director:</span>
                  <span className="value">{movie.director}</span>
                </div>
                <div className="info-row">
                  <span className="label">Duration:</span>
                  <span className="value">{movie.duration}</span>
                </div>
                <div className="genres">
                  {movie.genre.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>
    </div>
  );
};

export default MovieList;
