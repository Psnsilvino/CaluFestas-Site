
import { Link } from "react-router-dom";
import logo from "../assets/CaLu.png"
// import axios from "axios";


const NavBar = () => {

	// const navigate = useNavigate();

	// const handleClick = async (e: { preventDefault: () => void; }) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.post("http://localhost:3000/api/users/logout", {}, {withCredentials: true})
	// 		console.log(response)
	// 		navigate("/login")
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	return (
		<>
			<nav className="bg-white text-back px-6 py-4 flex justify-between items-center">
				{/* Logo */}
				<Link to={"/"} className="text-3xl font-bold">
					<img src={logo} alt="logo" className="w-24" />
				</Link>
				{/* Links */}
				<ul className="flex space-x-8 text-lg">
					<li>
						<Link to={"/"} className="hover:underline">Catalogo</Link>
					</li>
					<li>
						<Link to={"/"} className="hover:underline">Locação</Link>
					</li>
					<li>
						<Link to={"/"} className="hover:underline">FAQ</Link>
					</li>
					<li>
						<Link to={"/"} className="hover:underline">Contato</Link>
					</li>
					<li>
						<Link to={"/"} className="hover:underline">Cadastrar Produto</Link>
					</li>
				</ul>
				{/* Logout button */}
				
				<Link to={"/cadastro"}>
					<button className="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-full hover:underline">
						Cadastro/Login
					</button>
				</Link>
			</nav>
		</>
	);
};

export default NavBar;