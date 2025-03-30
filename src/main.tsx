import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home.tsx';
import Cadastro from './pages/cadastro.tsx';
import Login from './pages/login.tsx';



const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	}, 
	{
		path: "/cadastro",
		element: <Cadastro />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	


	

]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)