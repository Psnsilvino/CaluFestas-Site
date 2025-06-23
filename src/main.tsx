import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home.tsx';
import HomeAdm from './pages/homeadm.tsx';
import Cadastro from './pages/cadastro.tsx';
import Login from './pages/login.tsx';
import Catalago from './pages/catalogo';
import CadastrarProduto from './pages/cadastrarproduto.tsx';
import EsqueceuSenha from './pages/esqueceusenha.tsx'; // Importando a página de recuperação de senha
import CadastrarNovaSenha from './pages/cadastrarnovasenha.tsx';
import CodigoDeVerificacao from './pages/codigodeverificacao.tsx';
import Carrinho from './pages/carrinho.tsx';
import Redirecionamento from './pages/redirecionamento.tsx';
import FAQ from './pages/FAQ.tsx';
import ComprasRealizadas from './pages/comprasrealizadas.tsx';
import PrivateRoute from "./privateRoutes";
import { AuthProvider } from './context/authContext.tsx';
import ComprasRealizadasAdm from './pages/comprarrealizadasadm.tsx';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Homeadm",
        element: <HomeAdm />,
    },
    {
        path: "/cadastro",
        element: <Cadastro />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/catalogo",
        element: <Catalago />,
    },
    {
        path: "/cadastrarproduto",
        element: <CadastrarProduto />,
    },
    {
        path: "/esqueceusenha", // Adicionando a rota para recuperação de senha
        element: <EsqueceuSenha />,
    },
        {
        path: "/cadastrarnovasenha", // Adicionando a rota para recuperação de senha
        element: <CadastrarNovaSenha />,
    },
    {
        path:"/codigodeverificacao",
        element: <CodigoDeVerificacao />,
    },
    {
        path:"/carrinho",
        element: <PrivateRoute><Carrinho/></PrivateRoute>,
    },
    {
        path:"/redirecionamento",
        element: <Redirecionamento />,
    },
    {
        path:"/FAQ",
        element: <FAQ />,
    },
    {
        path:"/comprasrealizadas",
        element: <PrivateRoute><ComprasRealizadas /></PrivateRoute>
    },
    {
        path:"/comprasrealizadasadm",
        element: <PrivateRoute><ComprasRealizadasAdm /></PrivateRoute>
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </AuthProvider>
    </StrictMode>,
);