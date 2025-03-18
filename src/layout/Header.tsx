import { Link } from "react-router-dom";
import { FC } from "react";

// Компонент шапки сайта
const Header: FC = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/" className="nav-link">
          🎬 Movie Database
        </Link>
      </nav>
    </header>
  );
};

export default Header;
