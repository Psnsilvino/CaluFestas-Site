import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBarlogin';
import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/clients/login', formData);
      const token = response.data.token;

      // Salvar o token (pode ser localStorage ou sessionStorage)
      localStorage.setItem('token', token);
      console.log('Login bem-sucedido:', response.data);
      alert('Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao acessar sua conta:', error);
      alert('Erro ao acessar sua conta. Tente novamente.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div
          className="w-1/2 flex items-center justify-center relative"
          style={{
            backgroundImage: "url('src/assets/foto 8.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="relative text-white text-5xl font-bold z-10">CaLu - Festas e Eventos</h1>
        </div>

        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4">Olá!</h2>
            <p className="text-gray-600 mb-8">Acesse sua conta!</p>

            <form onSubmit={handleSubmit}>
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

              {/* Link para recuperação de senha */}
              <p className="mt-4 text-center text-gray-600">
                <Link to="/esqueceusenha" className="text-blue-600 hover:underline">
                  Esqueceu a senha?
                </Link>
              </p>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
              >
                Entrar
              </button>
            </form>

            {/* Link para a tela de registro */}
            <p className="mt-4 text-center text-gray-600">
              Ainda não possui uma conta?{' '}
              <Link to="/cadastro" className="text-blue-600 hover:underline">
                Registre-se aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;