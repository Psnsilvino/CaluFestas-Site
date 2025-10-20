import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CaLu.png";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center shadow">
      {/* Logo */}
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="CaLu Festas e Eventos"
            className="h-8 md:h-10 cursor-pointer"
          />
        </Link>
      </div>

      {/* Menu */}
      <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
        <Link
          to="/catalogo"
          className="hover:text-[#c6a875] transition-colors duration-200"
        >
          Galeria
        </Link>

        <Link
          to="/catalogo"
          className="hover:text-[#c6a875] transition-colors duration-200"
        >
          Catálogo
        </Link>

        <Link
          to="/contato"
          className="hover:text-[#c6a875] transition-colors duration-200"
        >
          Contato
        </Link>

        <Link
          to="/faq"
          className="hover:text-[#c6a875] transition-colors duration-200"
        >
          FAQ
        </Link>

        <Link
          to="/login"
          className="px-4 py-1 rounded-md text-white transition"
          style={{ backgroundColor: "#c6a875" }}
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
