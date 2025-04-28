import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import React, { useState } from 'react';

const EsqueceuSenha: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o email de recuperação
    alert(`Instruções de recuperação enviadas para: ${email}`);
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="w-1/2 bg-blue-900 flex items-center justify-center relative">
          <h1 className="text-white text-5xl font-bold">CaLu - Festas e Eventos</h1>
        </div>

        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4">Recuperar Senha</h2>
            <p className="text-gray-600 mb-8">
              Insira o endereço de email associado à sua conta para receber instruções de recuperação.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Endereço de email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                Enviar Instruções
              </button>
            </form>

            {/* Link para voltar ao login */}
            <p className="mt-4 text-center text-gray-600">
              <Link to="/login" className="text-blue-600 hover:underline">
                Voltar para o Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EsqueceuSenha;