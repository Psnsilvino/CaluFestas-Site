import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import instagram1 from '../assets/foto 13.jpg';
import instagram2 from '../assets/foto 11.jpg';
import instagram3 from '../assets/foto 12.jpg';

interface Locacao {
  id: number;
  usuario: string;
  data: string;
  itens: { nome: string; quantidade: number }[];
  total: number;
  concluida?: boolean;
}

const locacoesIniciais: Locacao[] = [
  {
    id: 1,
    usuario: 'Maria Silva',
    data: '10/06/2025',
    itens: [
      { nome: 'Mesa', quantidade: 4 },
      { nome: 'Cadeira', quantidade: 20 },
    ],
    total: 200.0,
    concluida: false,
  },
  {
    id: 2,
    usuario: 'João Souza',
    data: '05/06/2025',
    itens: [
      { nome: 'Mesa', quantidade: 2 },
      { nome: 'Cadeira', quantidade: 10 },
    ],
    total: 100.0,
    concluida: false,
  },
];

const ComprasRealizadasAdm: React.FC = () => {
  const [locacoes, setLocacoes] = useState<Locacao[]>(locacoesIniciais);

  const handleConcluir = (id: number) => {
    setLocacoes((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, concluida: true } : loc
      )
    );
  };

  const handleExcluir = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta locação?')) {
      setLocacoes((prev) => prev.filter((loc) => loc.id !== id));
    }
  };

  const handleAnalisar = (id: number) => {
    const locacao = locacoes.find((loc) => loc.id === id);
    if (locacao) {
      alert(`Locação de ${locacao.usuario} adicionada à lista de compras para análise!`);
      // Aqui você pode implementar a lógica real de adicionar à lista de compras
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center bg-gray-100 w-full min-h-screen pt-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Locações Realizadas (Admin)</h1>
        <div className="w-full max-w-2xl">
          {locacoes.length === 0 ? (
            <p className="text-center text-gray-600">Nenhuma locação realizada ainda.</p>
          ) : (
            locacoes.map((locacao) => (
              <div key={locacao.id} className={`bg-white rounded-lg shadow-md p-6 mb-4 ${locacao.concluida ? 'opacity-60' : ''}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-blue-900">Usuário:</span>
                  <span>{locacao.usuario}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-blue-900">Data:</span>
                  <span>{locacao.data}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-blue-900">Itens:</span>
                  <ul className="list-disc list-inside">
                    {locacao.itens.map((item, idx) => (
                      <li key={idx}>
                        {item.nome} - {item.quantidade} unidade{item.quantidade > 1 ? 's' : ''}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-blue-900">Total:</span>
                  <span>R$ {locacao.total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className={`px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition ${locacao.concluida ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handleConcluir(locacao.id)}
                    disabled={locacao.concluida}
                  >
                    {locacao.concluida ? 'Concluída' : 'Concluir'}
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition"
                    onClick={() => handleAnalisar(locacao.id)}
                  >
                    Analisar
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                    onClick={() => handleExcluir(locacao.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Rodapé fora do container principal */}
      <div className="bg-blue-900 text-white w-full py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CaLu Festas e Eventos</h3>
            <p>Organizamos eventos inesquecíveis! Entre em contato para transformar seu sonho em realidade.</p>
            <p>📞 Telefone: (11) 1234-5678</p>
            <p>📸: <a href="https://www.instagram.com/calu_conceitos?utm_source=ig_web_button_share_sheet&igshid=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="underline">@calu_conceitos</a></p>
          </div>
          <div>
            <a href="https://www.instagram.com/calu_conceitos?utm_source=ig_web_button_share_sheet&igshid=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl font-bold mb-4">Instagram</h3>
            </a>
            <div className="grid grid-cols-3 gap-4">
              <img src={instagram1} alt="Instagram 1" className="w-full h-auto rounded-md" />
              <img src={instagram2} alt="Instagram 2" className="w-full h-auto rounded-md" />
              <img src={instagram3} alt="Instagram 3" className="w-full h-auto rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComprasRealizadasAdm;