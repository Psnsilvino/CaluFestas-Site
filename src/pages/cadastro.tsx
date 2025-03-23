import NavBar from '../components/NavBar';

import React from 'react';

const Register: React.FC = () => {
  return (
    <>
    <NavBar />
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center relative">
        <h1 className="text-white text-5xl font-bold">CaLu - Festas e Eventos</h1>
        {/* Optional Circle Design */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-[600px] h-[600px] rounded-full border border-yellow-500 opacity-50 absolute -top-110 -left-50"></div>
          <div className="w-[500px] h-[500px] rounded-full border border-yellow-500 opacity-50 absolute -top-95 -left-40"></div>
          <div className="w-[400px] h-[400px] rounded-full border border-yellow-500 opacity-50 absolute -top-80 -left-30"></div>


          <div className="w-[600px] h-[600px] rounded-full border border-yellow-500 opacity-50 absolute -bottom-110 -right-50"></div>
          <div className="w-[500px] h-[500px] rounded-full border border-yellow-500 opacity-50 absolute -bottom-95 -right-40"></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">Olá!</h2>
          <p className="text-gray-600 mb-8">Regitre-se para começar</p>

          {/* Form */}
          <form>
            <div className="mb-4">
              <label className="sr-only">Nome Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  🧑
                </span>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="sr-only">e-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  📧
                </span>
                <input
                  type="email"
                  placeholder="Endereço de email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="sr-only">Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  🔒
                </span>
                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
            >
              Registrar-se
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
