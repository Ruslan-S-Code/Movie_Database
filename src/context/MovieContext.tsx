import { createContext, useContext, useReducer, ReactNode } from "react";
import movies from "../data/data";

// Типы для фильмов и состояния приложения
type Movie = {
  id: number;
  title: string;
  year: string;
  rate: string;
  genre: string[];
  director: string;
  duration: string;
};

type SortType =
  | "year-asc"
  | "year-desc"
  | "rating-asc"
  | "rating-desc"
  | "title-asc"
  | "title-desc";

type Filters = {
  search: string;
  year: string;
  genre: string;
};

type MovieState = {
  movies: Movie[];
  sortType: SortType;
  filters: Filters;
  filteredMovies: Movie[];
};

// Типы действий для reducer
type MovieAction =
  | { type: "SET_SORT_TYPE"; payload: SortType }
  | { type: "SET_FILTER"; payload: Partial<Filters> }
  | { type: "APPLY_FILTERS_AND_SORT" };

// Начальное состояние приложения
const initialState: MovieState = {
  movies,
  sortType: "year-desc",
  filters: {
    search: "",
    year: "",
    genre: "",
  },
  filteredMovies: movies,
};

// Reducer для управления состоянием
const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "SET_SORT_TYPE":
      return {
        ...state,
        sortType: action.payload,
      };
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case "APPLY_FILTERS_AND_SORT":
      let filtered = [...state.movies];

      // Применяем фильтр по поиску
      if (state.filters.search) {
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }

      // Применяем фильтр по году
      if (state.filters.year) {
        filtered = filtered.filter(
          (movie) => movie.year === state.filters.year
        );
      }

      // Применяем фильтр по жанру
      if (state.filters.genre) {
        filtered = filtered.filter((movie) =>
          movie.genre.includes(state.filters.genre)
        );
      }

      // Применяем сортировку
      filtered.sort((a, b) => {
        switch (state.sortType) {
          case "year-desc":
            return b.year.localeCompare(a.year);
          case "year-asc":
            return a.year.localeCompare(b.year);
          case "rating-desc":
            return parseFloat(b.rate) - parseFloat(a.rate);
          case "rating-asc":
            return parseFloat(a.rate) - parseFloat(b.rate);
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });

      return {
        ...state,
        filteredMovies: filtered,
      };
    default:
      return state;
  }
};

// Создаем контекст для фильмов
const MovieContext = createContext<{
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
} | null>(null);

// Провайдер контекста
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

// Хук для использования контекста
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
