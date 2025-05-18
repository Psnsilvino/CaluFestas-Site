import { Link } from "react-router-dom";
import logo from "../assets/CaLu.png";
// import axios from "axios";

const NavBar = () => {
    return (
        <>
            <nav className="bg-white text-back px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to={"/"} className="text-3xl font-bold">
                    <img src={logo} alt="logo" className="w-24" />
                </Link>
                {/* Links */}
                {/* Removed Catalogo, Locação, FAQ, Contato, and Cadastrar Produto */}
            </nav>
        </>
    );
};

export default NavBar;