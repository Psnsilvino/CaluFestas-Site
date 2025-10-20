// src/pages/detalhesdoproduto.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Importação das imagens
import mesa140 from "../assets/mesa140.jpeg";
import cadeira1 from "../assets/cadeira1.jpeg";
import logo from "../assets/CaLu.png";

const thumbnails = [mesa140, mesa140, cadeira1];

const DetalhesDoProduto: React.FC = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = React.useState<string>(thumbnails[0]);
  const [quantidade, setQuantidade] = React.useState<number>(2);
  const estoque = 5;

  const zoomRef = React.useRef<any>(null);

  React.useEffect(() => {
    let mounted = true;
    import("medium-zoom")
      .then((mod) => {
        if (!mounted) return;
        const mz = mod.default
          ? mod.default("#mainImage", {
              margin: 24,
              background: "#000",
              scrollOffset: 40,
            })
          : null;
        zoomRef.current = mz;
      })
      .catch(() => {});
    return () => {
      mounted = false;
      if (zoomRef.current && typeof zoomRef.current.detach === "function")
        zoomRef.current.detach();
    };
  }, []);

  const adicionarAoCarrinho = () => {
    alert(`Adicionado ${quantidade} unidade(s) ao carrinho.`);
  };

  return (
    <>
      {/* Cabeçalho */}
      <header className="bg-white p-4 flex justify-between items-center shadow">
        <div>
          <img
            src={logo}
            alt="CaLu Festas e Eventos"
            className="h-8 md:h-10"
          />
        </div>
        <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
          <a
            href="#"
            className="hover:text-[#c6a875] transition-colors duration-200"
          >
            Galeria
          </a>
          <a
            href="#"
            className="hover:text-[#c6a875] transition-colors duration-200"
          >
            Locação
          </a>
          <a
            href="#"
            className="hover:text-[#c6a875] transition-colors duration-200"
          >
            Contato
          </a>
          <a
            href="#"
            className="hover:text-[#c6a875] transition-colors duration-200"
          >
            FAQ
          </a>
          <button
            className="px-4 py-1 rounded-md text-white transition"
            style={{ backgroundColor: "#c6a875" }}
          >
            Login
          </button>
        </nav>
      </header>

      {/* Botão voltar */}
      <div className=" bg-[#f9f5f0] px-6 py-4">
  <button
    onClick={() => navigate(-1)}
    className="text-[#c6a875] font-medium flex items-center gap-1 hover:underline transition-all duration-200"
  >
    <span className="text-lg">←</span> Voltar
  </button>
      </div>

      {/* Conteúdo principal */}
      <main className="px-4 py-8 bg-[#f9f5f0] font-sans">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-x-10 gap-y-12">
          {/* Miniaturas */}
          <div className="flex flex-col gap-3">
            {thumbnails.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(src)}
                className={`w-20 h-20 object-cover rounded-lg shadow-lg border hover:opacity-80 transition cursor-pointer ${
                  mainImage === src ? "ring-2 ring-[#c6a875]" : ""
                }`}
              />
            ))}
          </div>

          {/* Imagem principal */}
          <div className="mr-[80px]">
            <img
              id="mainImage"
              src={mainImage}
              alt="Mesa Principal"
              className="w-full max-w-[450px] h-auto object-cover border rounded-xl shadow-md"
            />
          </div>

          {/* Informações do produto */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">Mesa 1,40 m</h2>

            <div>
              <label
                htmlFor="model"
                className="block text-sm text-gray-600 mb-1"
              >
                Modelo
              </label>
              <select
                id="model"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a875]"
              >
                <option>Mesa de 1,40 metros de diâmetro</option>
              </select>
            </div>

            <p className="text-xl text-[#c6a875] font-bold mt-4">R$ 20,00</p>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Descrição
              </label>
              <div className="bg-gray-100 p-3 rounded-md text-gray-700">
                Mesa redonda com capacidade para 10 cadeiras
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Estoque disponível:{" "}
                <span className="font-semibold">{estoque} unidades</span>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 border rounded text-lg hover:bg-gray-200 shadow-sm"
                >
                  -
                </button>
                <span className="text-md">{quantidade}</span>
                <button
                  onClick={() => setQuantidade((q) => Math.min(estoque, q + 1))}
                  className="w-8 h-8 border rounded text-lg hover:bg-gray-200 shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={adicionarAoCarrinho}
              className="bg-[#c6a875] hover:bg-[#b39264] text-white px-6 py-3 rounded-lg w-full font-semibold shadow transition-all duration-300"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetalhesDoProduto;
