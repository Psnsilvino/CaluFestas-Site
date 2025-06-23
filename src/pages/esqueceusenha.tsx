import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBarlogin';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EsqueceuSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/clients/ForgotPassword', {
        email: email,
      });

      if (response.status === 201) {
        toast.success('Instruções de recuperação enviadas com sucesso!');
        navigate('/codigodeverificacao');
      } else {
        toast.error('Não foi possível enviar as instruções. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao enviar email de recuperação. Verifique o console.');
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
            backgroundImage: "url('src/assets/foto 6.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay para deixar o texto legível */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Texto sobre a imagem */}
          <h1 className="relative text-white text-5xl font-bold z-10">CaLu - Festas e Eventos</h1>
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
                  required
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