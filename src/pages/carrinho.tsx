import React from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const CartPage: React.FC = () => {
  const cartItems: CartItem[] = []; // Começa vazio
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 4;
  const total = subtotal + shipping;

  return (
    <>
      <NavBar />
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
      <div className="flex flex-col md:flex-row md:gap-28 gap-10 max-w-7xl mx-auto px-4 md:px-0 justify-between">

        {/* Cart Section */}
        <div className="flex-1">
          <div className="mb-4">
            
            <Link
            to="/"
                className="text-black font-semibold flex items-center space-x-2 mb-2"
            >
                <span>←</span>
                <span>Continue alugando</span>
            </Link>

            
            <hr />
          </div>

          <h2 className="text-xl font-semibold mt-4">Carrinho</h2>
          <p className="text-sm text-gray-500 mb-6">
            {cartItems.length > 0
              ? `Você possui ${cartItems.length} item(s) no carrinho`
              : 'Seu carrinho está vazio'}
          </p>

          {/* Espaço reservado para os itens do carrinho */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg text-gray-400">
              <p className="text-lg">🛒 Sem itens no carrinho</p>
              <p className="text-sm mt-2">Adicione produtos ao carrinho aqui.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-sm rounded-xl p-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border px-2 py-1 rounded-md">
                    <span>1</span>
                    <span className="ml-2 text-xs">▲▼</span>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                  <button className="text-gray-400 hover:text-red-500">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Section */}
        <div className="w-full md:w-[400px] bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Detalhes do Pagamento</h2>
            
          </div>

          <div className="mb-4">
            <p className="mb-2">Tipo do pagamento</p>
            <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg text-sm font-medium capitalize bg-white/20 text-white">
                Pix
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium capitalize bg-white/20 text-white">
                Cartão
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium capitalize bg-white/20 text-white">
                Dinheiro
            </button>
           
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block mb-1">Nome do Cliente</label>
              <input
                type="text"
                placeholder="Nome"
                className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">Endereço</label>
              <input
                type="text"
                placeholder="Rua x casa y"
                className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1">Data de entrega</label>
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1">Data de retirada</label>
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-1 text-sm">
            
            
            <div className="flex justify-between font-semibold">
              <span>Total (Frete a combinar)</span>
              <span>R${total}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full py-3 rounded-lg text-white bg-gradient-to-r bg-yellow-500  font-semibold flex justify-between items-center px-6"
            disabled={cartItems.length === 0}
          >
            <span>R${total}</span>
            <span>Redirecionamento →</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
