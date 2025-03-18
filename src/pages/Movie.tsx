import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import backgroundImage from "../assets/kino.webp";

// Компонент детальной страницы фильма
const Movie = () => {
  // Получаем ID фильма из URL
  const { id } = useParams<{ id: string }>();
  // Хук для навигации
  const navigate = useNavigate();
  // Получаем состояние из контекста
  const { state } = useMovieContext();

  // Находим фильм по ID
  const movie = state.movies.find((m) => m.id === Number(id));

  // Если фильм не найден, перенаправляем на главную
  if (!movie) {
    navigate("/");
    return null;
  }

  return (
    <div className="container">
      {/* Фоновое изображение */}
      <div
        className="page-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Кнопка возврата */}
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Movies
      </button>

      {/* Детальная информация о фильме */}
      <div className="movie-details">
        <h1>{movie.title}</h1>
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
    </div>
  );
};

export default Movie;
