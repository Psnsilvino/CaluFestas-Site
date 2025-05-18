import { Link } from 'react-router-dom';
import NavBar from '../components/NavBarlogin';
import React, { useState } from 'react';
import axios from 'axios';

const CadastrarNovaSenha: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Tente novamente.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/clients/ResetPassword', {
        password: password,
      });

      if (response.status === 200) {
        alert('Senha cadastrada com sucesso!');
      } else {
        alert('Não foi possível cadastrar a nova senha. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao cadastrar nova senha. Verifique o console.');
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div
          className="w-1/2 flex items-center justify-center relative"
          style={{
            backgroundImage: "url('src/assets/foto 7.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative text-white text-5xl font-bold z-10">CaLu - Festas e Eventos</h1>
        </div>

        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4">Cadastrar Nova Senha</h2>
            <p className="text-gray-600 mb-8">
              Insira sua nova senha e confirme para atualizar sua conta.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                Cadastrar Nova Senha
              </button>
            </form>

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

export default CadastrarNovaSenha;