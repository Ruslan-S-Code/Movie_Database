import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { MovieProvider } from "../context/MovieContext";
import { FC } from "react";

// Компонент макета приложения
const Layout: FC = () => {
  return (
    <MovieProvider>
      <div className="app">
        {/* Шапка сайта */}
        <Header />

        {/* Основной контент */}
        <main>
          <Outlet />
        </main>

        {/* Подвал сайта */}
        <Footer />
      </div>
    </MovieProvider>
  );
};

export default Layout;
