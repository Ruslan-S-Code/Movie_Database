import { Outlet, Link } from "react-router-dom";
import { MovieProvider } from "../context/MovieContext";

const Layout = () => {
  return (
    <MovieProvider>
      <div className="app-container">
        <header className="app-header">
          <nav>
            <Link to="/" className="nav-link">
              🏠 Home
            </Link>
          </nav>
        </header>

        <main className="app-main">
          <Outlet />
        </main>

        <footer className="app-footer">
          <p>© 2025 Movie App</p>
        </footer>
      </div>
    </MovieProvider>
  );
};

export default Layout;
