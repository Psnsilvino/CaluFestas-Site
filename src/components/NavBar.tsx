import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/CaLu.png";
import { useAuth } from "../context/useAuth";

const NavBar: React.FC = () => {
  const { perfil } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleRedirect = () => {
    setMenuOpen(false);
    if (perfil?.cargo === "admin") navigate("/comprasrealizadasadm");
    else navigate("/comprasrealizadas");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left: logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="CaLu Home" className="flex items-center">
              <img src={logo} alt="CaLu" className="w-24 h-auto" />
            </Link>
          </div>

          {/* center: links (desktop) */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <Link to="/" className="text-gray-700 hover:text-[#1a3d39] font-medium">
              Home
            </Link>
            <Link to="/catalogo" className="text-gray-700 hover:text-[#1a3d39] font-medium">
              Catálogo
            </Link>
            <Link to="/FAQ" className="text-gray-700 hover:text-[#1a3d39] font-medium">
              FAQ
            </Link>
            {perfil && (
              <Link to="/carrinho" className="text-gray-700 hover:text-[#1a3d39] font-medium">
                Carrinho
              </Link>
            )}
          </div>

          {/* right: LOGIN / Conta */}
          <div className="flex items-center">
            <div className="relative" ref={menuRef}>
              {!perfil ? (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="bg-[#1a3d39] hover:bg-[#23524c] text-white py-2 px-4 rounded-lg font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1a3d39]/40"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    aria-controls="account-menu"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-lg font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Conta
                  </button>

                  {menuOpen && (
                    <div
                      id="account-menu"
                      role="menu"
                      className="origin-top-right absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div className="py-2">
                        <Link
                          to="/"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          🏠 Home
                        </Link>

                        <Link
                          to="/catalogo"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          📖 Catálogo
                        </Link>

                        <Link
                          to="/FAQ"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          ❓ FAQ
                        </Link>

                        <div className="border-t border-gray-100 my-1" />

                        {perfil && (
                          <Link
                            to="/carrinho"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            role="menuitem"
                          >
                            🛒 Carrinho
                          </Link>
                        )}

                        {perfil?.cargo === "admin" && (
                          <Link
                            to="/cadastrarproduto"
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                            role="menuitem"
                          >
                            ➕ Cadastrar Produto
                          </Link>
                        )}

                        {perfil && (
                          <button
                            onClick={() => {
                              handleRedirect();
                            }}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                            role="menuitem"
                          >
                            📋 Compras realizadas
                          </button>
                        )}

                        <div className="border-t border-gray-100 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                          role="menuitem"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;