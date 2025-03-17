import React from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center bg-gray-100 w-full h-screen pt-6">
        {/* Caixa de Boas-Vindas */}
        <div className="bg-blue-100 text-center p-6 rounded-lg shadow-md w-full max-w-4xl mb-10">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            CaLu Festas e Eventos
          </h1>
          <p className="text-blue-600">
            Um moinho de vento, em sentido restrito, é um moinho que usa as hélices como elemento de captação e conversão da energia eólica para outro tipo de energia apropriada para movimentar outros mecanismos.
          </p>

        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 w-full px-6 max-w-5xl mb-10">
          {/* Card Estoque */}
          <Link to={"/"}>
            <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 hover:bg-yellow-500 transition-all">
              <div className="text-4xl">📄</div>
              <h2 className="text-xl font-bold">Catalogo</h2>
            </div>
          </Link>

          {/* Card Clientes */}
          <Link to={"/"}>
            <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 hover:bg-yellow-500 transition-all">
              <div className="text-4xl">👥</div>
              <h2 className="text-xl font-bold">Locação</h2>
            </div>
          </Link>

          {/* Card Locações */}
          <Link to={"/"}>
            <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 hover:bg-yellow-500 transition-all">
              <div className="text-4xl">🚛</div>
              <h2 className="text-xl font-bold">FAQ</h2>
            </div>
          </Link>

          {/* Card Locações */}
          <Link to={"/"}>
            <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4 hover:bg-yellow-500 transition-all">
              <div className="text-4xl">🚛</div>
              <h2 className="text-xl font-bold">Contato</h2>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Home;