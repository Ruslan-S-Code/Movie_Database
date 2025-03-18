import { createContext, useContext, useReducer, ReactNode } from "react";
import movies from "../data/data";

type Movie = {
  id: number;
  title: string;
  year: string;
  director: string;
  duration: string;
  genre: string[];
  rate: string;
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

type MovieAction =
  | { type: "SET_SORT_TYPE"; payload: SortType }
  | { type: "SET_FILTER"; payload: Partial<Filters> }
  | { type: "APPLY_FILTERS_AND_SORT" };

const initialState: MovieState = {
  movies: movies,
  sortType: "year-desc",
  filters: {
    search: "",
    year: "",
    genre: "",
  },
  filteredMovies: movies,
};

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
        filters: { ...state.filters, ...action.payload },
      };

    case "APPLY_FILTERS_AND_SORT": {
      let filtered = [...state.movies];

      // Apply search filter
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        );
      }

      // Apply year filter
      if (state.filters.year) {
        filtered = filtered.filter(
          (movie) => movie.year === state.filters.year
        );
      }

      // Apply genre filter
      if (state.filters.genre) {
        filtered = filtered.filter((movie) =>
          movie.genre.includes(state.filters.genre)
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (state.sortType) {
          case "year-asc":
            return a.year.localeCompare(b.year);
          case "year-desc":
            return b.year.localeCompare(a.year);
          case "rating-asc":
            return parseFloat(a.rate) - parseFloat(b.rate);
          case "rating-desc":
            return parseFloat(b.rate) - parseFloat(a.rate);
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
    }

    default:
      return state;
  }
};

type MovieContextType = {
  state: MovieState;
  dispatch: React.Dispatch<MovieAction>;
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
