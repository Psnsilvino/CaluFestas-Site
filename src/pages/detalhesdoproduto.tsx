import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import mediumZoom, { Zoom } from "medium-zoom";
import axios from "axios";
import Navbar from "../components/NavBar";


interface Produto {
  _id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoria: string;
  subcategoria?: string;
  quantidade?: number;
  quantidadeemlocacao?: number;
}

const DetalhesDoProduto: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // /produto/:id

  const [produto, setProduto] = React.useState<Produto | null>(null);
  const [produtos, setProdutos] = React.useState<Produto[]>([]);
  const [mainImage, setMainImage] = React.useState<string>("");
  const [quantidade, setQuantidade] = React.useState<number>(1);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const zoomRef = React.useRef<Zoom | null>(null);

  // ✅ Inicializa o zoom
  React.useEffect(() => {
    if (imgRef.current) {
      const zoomInstance = mediumZoom(imgRef.current, {
        margin: 24,
        background: "#000",
        scrollOffset: 40,
      });
      zoomRef.current = zoomInstance;
    }

    return () => zoomRef.current?.detach();
  }, []);

  // ✅ Carrega produtos do localStorage ou API
  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const localData = localStorage.getItem("produtos");

        let produtosLista: Produto[];

        if (localData) {
          produtosLista = JSON.parse(localData);
        } else {
          const response = await axios.get<Produto[]>("http://localhost:8080/api/products/");
          produtosLista = response.data;
          localStorage.setItem("produtos", JSON.stringify(produtosLista));
        }

        setProdutos(produtosLista);

        const encontrado = produtosLista.find((p) => p._id === id);
        if (encontrado) {
          setProduto(encontrado);
          setMainImage(encontrado.imagem);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, [id]);

  const adicionarAoCarrinho = () => {
    if (!produto) return;
    alert(`Adicionado ${quantidade}x ${produto.nome} ao carrinho.`);
  };

  const handleTrocarProduto = (novoId: string) => {
    navigate(`/detalhesdoproduto/${novoId}`);
  };

  if (!produto) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Carregando produto...
      </div>
    );
  }

  // ✅ Filtra produtos da mesma categoria
  const produtosMesmaCategoria = produtos.filter(
    (p) => p.categoria === produto.categoria && p._id !== produto._id
  );

  return (
    <>
      {/* Cabeçalho */}
      <Navbar />

      {/* Botão voltar */}
      <div className="bg-[#f9f5f0] px-6 py-4" >
        <button
          onClick={() => navigate(-1)}
          className="text-[#c6a875] font-medium flex items-center gap-1 hover:underline transition-all duration-200"
        >
          <span className="text-lg">←</span> Voltar
        </button>
      </div>

      <div className="bg-[#F7F3EA] min-h-screen">
        {/* Conteúdo principal */}
        <main className="px-4 py-8 bg-[#f9f5f0] font-sans ">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-x-10 gap-y-12">
            {/* Miniaturas */}
            {/* <div className="flex flex-col gap-3">
              {produto.imagens.map((src, idx) => (
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
            </div> */}
            {/* Imagem principal */}
            <div className="mr-[80px]">
              <img
                ref={imgRef}
                src={mainImage}
                alt={produto.nome}
                className="w-full max-w-[450px] h-auto object-cover border rounded-xl shadow-md cursor-zoom-in"
              />
            </div>
            {/* Informações do produto */}
            <div className="flex-1 bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">{produto.nome}</h2>
              {/* Dropdown de produtos da mesma categoria */}
              {produtosMesmaCategoria.length > 0 && (
                <div>
                  <label htmlFor="outros-produtos" className="block text-sm text-gray-600 mb-1">
                    Outros produtos da categoria "{produto.categoria}"
                  </label>
                  <select
                    id="outros-produtos"
                    onChange={(e) => handleTrocarProduto(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c6a875]"
                  >
                    <option value="">Selecione outro produto</option>
                    {produtosMesmaCategoria.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <p className="text-xl text-[#c6a875] font-bold mt-4">
                R$ {produto.preco.toFixed(2)}
              </p>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Descrição</label>
                <div className="bg-gray-100 p-3 rounded-md text-gray-700">
                  {produto.descricao}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Estoque disponível:{" "}
                  <span className="font-semibold">{produto.quantidade - produto.quantidadeemlocacao} unidades</span>
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
                    onClick={() => setQuantidade((q) => Math.min(produto.quantidade - produto.quantidadeemlocacao, q + 1))}
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
      </div>
    </>
  );
};

export default DetalhesDoProduto;
