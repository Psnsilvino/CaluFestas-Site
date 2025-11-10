import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CaLu.png";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  nome?: string;
  email?: string;
  exp?: number;
}

const Navbar: React.FC = () => {
  const [usuarioNome, setUsuarioNome] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.nome) {
          setUsuarioNome(decoded.nome);
        } else if (decoded.email) {
          // fallback se o token só tiver email
          setUsuarioNome(decoded.email.split("@")[0]);
        }
      } catch (err) {
        console.error("Token inválido:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsuarioNome(null);
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="CaLu Festas e Eventos"
            className="h-8 md:h-10 cursor-pointer"
          />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
        <Link to="/catalogo" className="hover:text-[#c6a875] transition-colors duration-200">
          Galeria
        </Link>
        <Link to="/catalogo" className="hover:text-[#c6a875] transition-colors duration-200">
          Catálogo
        </Link>
        <Link to="/contato" className="hover:text-[#c6a875] transition-colors duration-200">
          Contato
        </Link>
        <Link to="/faq" className="hover:text-[#c6a875] transition-colors duration-200">
          FAQ
        </Link>

        {usuarioNome ? (
          <div className="flex items-center space-x-3">
            <span className="text-[#c6a875] font-semibold">
              Olá, {usuarioNome}!
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500 text-sm"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 rounded-md text-white transition"
            style={{ backgroundColor: "#c6a875" }}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
