import { useParams, Link } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import backgroundImage from "../assets/kino.webp";

const Movie = () => {
  const { id } = useParams();
  const { state } = useMovieContext();
  const movie = state.movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container">
      <div
        className="page-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <Link to="/" className="back-button">
        Back to Movies
      </Link>
      <div className="movie-details">
        <h1>{movie.title}</h1>
        <div className="movie-info-detailed">
          <div className="info-section">
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
          </div>
          <div className="genres-section">
            <h3>Genres</h3>
            <div className="genres">
              {movie.genre.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
