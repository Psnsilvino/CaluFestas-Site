import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../hooks/useCart";
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import { IMaskInput } from 'react-imask';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataEntregaStr, setDataEntregaStr] = useState('');
  const [dataRetiradaStr, setDataRetiradaStr] = useState('');
  const [pagamento, setPagamento] = useState('Pix'); // default

  const subtotal = cart.reduce((acc, item) => acc + Number(item.preco) * item.quantidade, 0);

  const total = subtotal;
  const navigate = useNavigate()
  const { perfil } = useAuth();
  const token = localStorage.getItem('token');


  // Função auxiliar para converter string -> Date
  const parseDataHora = (str: string): Date | null => {
    const date = dayjs(str, 'DD-MM-YYYY HH:mm', true);
    return date.isValid() ? date.toDate() : null;
  };

  const handleSubmit = async () => {
    try {
      const dataEntregaDate = parseDataHora(dataEntregaStr);
      const dataRetiradaDate = parseDataHora(dataRetiradaStr);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); // zera o horário para comparar só as datas

      if (dataEntregaDate == null) {
        toast.error("Formato de data de entrega errado", { toastId: "dataEntregaErrada" })
        // setDataEntregaStr("")
        return
      }

      if (dataRetiradaDate == null) {
        toast.error("Formato de data de retirada errado", { toastId: "dataRetiradaErrada" })
        setDataRetiradaStr("")
        return
      }

      if (dataEntregaDate <= hoje) {
        toast.error("Não é possivel fazer uma locação antes do dia de amanhã", { toastId: "dataEntregaErradaHoje" })
        setDataEntregaStr("")
        return
      }

      if (dataRetiradaDate <= hoje) {
        toast.error("Não é possivel fazer a retirada antes do dia de amanhã", { toastId: "dataRetiradaErradaHoje" })
        setDataRetiradaStr("")
        return
      }

      if (dataEntregaDate == dataRetiradaDate) {
        toast.error("Não é possivel fazer a locacao e a retirada na mesma data e horario", { toastId: "dataRetiradaErradaHoje" })
        // setDataRetiradaStr("")
        return
      }

      if (dataRetiradaDate < dataEntregaDate) {
        toast.error("A data de retirada não pode ser anterior à data de entrega.", { toastId: "DatasRuins" });
        return;
      }

      if (!nome || !endereco || !dataEntregaDate || !dataRetiradaDate) {
        toast.error("Preencha todos os campos obrigatórios!", { toastId: "CamposObrigatorio" });
        return;
      }

      const payload = {
        nome,
        endereco,
        data_entrega: dataEntregaStr,
        data_retirada: dataRetiradaStr,
        pagamento,
        email: perfil?.email,
        total,
        items: cart.map(item => ({
          _id: item._id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade
        }))
      };

      const response = await axios.post('http://localhost:8080/api/locations/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });;

      if (response.status === 201 || response.status === 200) {
        toast.success('Pedido enviado com sucesso!');
        navigate("/redirecionamento", { state: { payload } });
        clearCart();
      }
    } catch (error) {
      console.error(error);
      toast('Erro ao enviar pedido. Tente novamente.');
    }
  };

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
              {cart.length > 0
                ? `Você possui ${cart.length} item(s) no carrinho`
                : 'Seu carrinho está vazio'}
            </p>

            {cart.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg text-gray-400">
                <p className="text-lg">🛒 Sem itens no carrinho</p>
                <p className="text-sm mt-2">Adicione produtos ao carrinho aqui.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white shadow-sm rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.nome}</h3>
                      <p className="text-sm text-gray-500">{item.descricao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border px-2 py-1 rounded-md">
                      <span>{item.quantidade}</span>
                    </div>
                    <span className="font-semibold">R${(Number(item.preco) * item.quantidade).toFixed(2)}</span>
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(item._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Section */}
          <div className="w-full md:w-[400px] bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Detalhes do Pagamento</h2>

            <div className="mb-4">
              <p className="mb-2">Tipo do pagamento</p>
              <div className="flex gap-3">
                {['Pix', 'Cartão', 'Dinheiro'].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${pagamento === type ? 'bg-white text-blue-900' : 'bg-white/20 text-white'
                      }`}
                    onClick={() => setPagamento(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
                  value={nome}
                  required
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Endereço</label>
                <input
                  type="text"
                  placeholder="Rua x casa y"
                  className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none"
                  value={endereco}
                  required
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1">Data de entrega</label>
                  <IMaskInput
                    mask="00-00-0000 00:00"
                    value={dataEntregaStr}
                    onAccept={(value) => setDataEntregaStr(value)}
                    placeholder="dd-mm-aaaa hh:mm"
                    className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none text-white"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1">Data de retirada</label>
                  <IMaskInput
                    mask="00-00-0000 00:00"
                    value={dataRetiradaStr}
                    onAccept={(value) => setDataRetiradaStr(value)}
                    placeholder="dd-mm-aaaa hh:mm"
                    className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1 text-sm">
              <div className="flex justify-between font-semibold">
                <span>Frete a ser combinado após a finalização no Whatsapp</span>
              </div>
            </div>

            <button
              className="mt-6 w-full py-3 rounded-lg text-white bg-yellow-500 font-semibold flex justify-between items-center px-6"
              disabled={cart.length === 0}
              onClick={handleSubmit}
            >
              <span>Total R${total.toFixed(2)}</span>
              <span>Finalizar Pedido →</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
