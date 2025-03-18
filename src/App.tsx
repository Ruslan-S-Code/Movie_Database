import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MovieList from "./pages/MovieList";
import Movie from "./pages/Movie";
import { MovieProvider } from "./context/MovieContext";

// Главный компонент приложения
const App = () => {
  return (
    // Провайдер маршрутизации
    <Router>
      {/* Провайдер контекста для управления состоянием фильмов */}
      <MovieProvider>
        {/* Определение маршрутов */}
        <Routes>
          {/* Корневой маршрут с макетом */}
          <Route element={<Layout />}>
            {/* Главная страница со списком фильмов */}
            <Route path="/" element={<MovieList />} />
            {/* Страница детальной информации о фильме */}
            <Route path="/movie/:id" element={<Movie />} />
          </Route>
        </Routes>
      </MovieProvider>
    </Router>
  );
};

export default App;
