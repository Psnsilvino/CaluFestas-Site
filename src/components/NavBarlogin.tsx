// ...existing code...
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

                {/* Botões à direita */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-white rounded transition"
                        style={{ backgroundColor: '#1a3d39' }}
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
// ...existing code...