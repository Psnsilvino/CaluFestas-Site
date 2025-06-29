import NavBar from '../components/NavBarlogin';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/clients/', formData);
      console.log('Registro bem-sucedido:', response.data);
      toast.success('Registro realizado com sucesso!', { toastId: "RegistroBom" });
    } catch (error) {
      console.error('Erro ao registrar:', error);
      toast.error('Erro ao registrar. Tente novamente.', { toastId: "RegistroRuim" });
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div
          className="w-1/2 flex items-center justify-center relative"
          style={{
            backgroundImage: "url('src/assets/foto 9.jpg')",
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
            <h2 className="text-3xl font-bold mb-4">Olá!</h2>
            <p className="text-gray-600 mb-8">Registre-se para começar!</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome Completo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Endereço de email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                Registrar-se
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Acesse sua conta aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;