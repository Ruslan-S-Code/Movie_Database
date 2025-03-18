type Movie = {
  id: number;
  title: string;
  year: string;
  rate: string;
  genre: string;
};

type State = {
  movies: Movie[];
  filteredMovies: Movie[];
};

type Action =
  | { type: "SORT_BY_TITLE"; order: "asc" | "desc" }
  | { type: "SORT_BY_YEAR"; order: "asc" | "desc" }
  | { type: "SORT_BY_RATING" }
  | { type: "FILTER_BY_GENRE"; genre: string }
  | { type: "SEARCH"; query: string }
  | { type: "RESET" };

export const movieReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SORT_BY_TITLE":
      return {
        ...state,
        filteredMovies: [...state.filteredMovies].sort((a, b) =>
          action.order === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        ),
      };

    case "SORT_BY_YEAR":
      return {
        ...state,
        filteredMovies: [...state.filteredMovies].sort((a, b) =>
          action.order === "asc"
            ? a.year.localeCompare(b.year)
            : b.year.localeCompare(a.year)
        ),
      };

    case "SORT_BY_RATING":
      return {
        ...state,
        filteredMovies: [...state.filteredMovies].sort((a, b) =>
          b.rate.localeCompare(a.rate)
        ),
      };

    case "FILTER_BY_GENRE":
      return {
        ...state,
        filteredMovies: state.movies.filter(
          (movie) => movie.genre === action.genre
        ),
      };

    case "SEARCH":
      return {
        ...state,
        filteredMovies: state.movies.filter((movie) =>
          movie.title.toLowerCase().includes(action.query.toLowerCase())
        ),
      };

    case "RESET":
      return { ...state, filteredMovies: state.movies };

    default:
      return state;
  }
};
