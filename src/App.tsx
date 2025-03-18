import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import MovieList from "./pages/MovieList";
import Movie from "./pages/Movie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <nav>
          <Link to="/" className="nav-link">
            Movie Database
          </Link>
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>© 2024 Movie Database. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <MovieProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </Layout>
      </Router>
    </MovieProvider>
  );
}

export default App;
