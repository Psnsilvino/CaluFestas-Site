import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../interfaces/product";
import Navbar from "../components/NavBar";

// =========== IMPORTS DE IMAGENS (fallbacks locais, se a API não tiver imagens) ===========
import mesa140 from "../assets/mesa140.jpeg";
import cadeira1 from "../assets/cadeira1.jpeg";
import conjuntopvc1 from "../assets/foto 12.jpg"
import Footer from "../components/Footer";

// =========== COMPONENTE AUXILIAR ===========
type RelacionadoProps = { img: string; titulo: string; preco: string; href?: string };
const ProdutoRelacionado: React.FC<RelacionadoProps> = ({ img, titulo, preco, href = "#" }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
    <img src={img} alt={titulo} className="h-40 w-full object-cover" />
    <div className="p-4">
      <a href={href} className="font-semibold text-gray-700">
        {titulo}
      </a>
      <p className="text-[#c6a875] font-bold">{preco}</p>
    </div>
  </div>
);

// =========== PÁGINA ===========
const DetalhesDoProduto: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produtos, setProdutos] = React.useState<Product[]>([]);
  const [produto, setProduto] = React.useState<Product | null>(null);
  const [mainImage, setMainImage] = React.useState<string>("");
  const [quantidade, setQuantidade] = React.useState<number>(1);
  const zoomRef = React.useRef<any>(null);

  // ✅ Medium-Zoom dinâmico
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
  }, [mainImage]);

  // ✅ Buscar produtos do localStorage ou da API Gin
  React.useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const localData = localStorage.getItem("produtos");
        let lista: Product[];

        if (localData) {
          lista = JSON.parse(localData);
        } else {
          const response = await axios.get<Product[]>("http://localhost:8080/api/products/");
          lista = response.data;
          localStorage.setItem("produtos", JSON.stringify(lista));
        }

        setProdutos(lista);

        const encontrado = lista.find((p) => p._id === id);
        if (encontrado) {
          setProduto(encontrado);
          setMainImage(encontrado.imagem[0] || mesa140);
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
    if (novoId) navigate(`/detalhesdoproduto/${novoId}`);
  };

  if (!produto) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Carregando produto...
      </div>
    );
  }

  const produtosMesmaCategoria = produtos.filter(
    (p) => p.categoria === produto.categoria && p._id !== produto._id
  );

  return (
    <>
      {/* Cabeçalho */}
      <Navbar />

      {/* Botão voltar */}
      <div className="bg-[#f9f5f0] px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#c6a875] font-medium flex items-center gap-1 hover:underline transition-all duration-200"
        >
          <span className="text-lg">←</span> Voltar
        </button>
      </div>

      {/* Conteúdo principal */}
      <main className="px-4 pt-2 pb-12 bg-[#f9f5f0]">
        <section className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a3d39]">
            Detalhes do Produto
          </h1>
          <p className="text-gray-600 mt-2">
            Confira as características e adicione ao carrinho
          </p>
        </section>

        {/* Card principal */}
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12">
          {/* Miniaturas */}
          <div className="flex md:flex-col gap-3 order-2 md:order-1">
            {produto.imagem?.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`thumb-${idx + 1}`}
                onClick={() => setMainImage(src)}
                className={`w-20 h-20 object-cover rounded-lg shadow-lg border hover:opacity-80 transition cursor-pointer ${
                  mainImage === src ? "ring-2 ring-[#c6a875]" : ""
                }`}
              />
            ))}
          </div>

          {/* Imagem principal */}
          <div className="order-1 md:order-2 md:mr-[70px]">
            <img
              id="mainImage"
              src={mainImage}
              alt={produto.nome}
              className="w-full max-w-[450px] h-auto object-cover border rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Informações do produto */}
          <div className="order-3 flex-1 bg-white p-6 border border-[#c6a875]/30 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">{produto.nome}</h2>

            {/* Dropdown de mesma categoria */}
            {produtosMesmaCategoria.length > 0 && (
              <div>
                <label
                  htmlFor="produtosCategoria"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Outros produtos da categoria "{produto.categoria}"
                </label>
                <select
                  id="produtosCategoria"
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
              R$ {Number(produto.preco).toFixed(2)}
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
                  aria-label="Diminuir"
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 border rounded text-xl font-bold text-[#1a3d39] hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="text-lg font-medium w-6 text-center" aria-live="polite">
                  {quantidade}
                </span>
                <button
                  aria-label="Aumentar"
                  onClick={() => setQuantidade((q) => Math.min(produto.quantidade - produto.quantidadeemlocacao, q + 1))}
                  className="w-9 h-9 border rounded text-xl font-bold text-[#1a3d39] hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={adicionarAoCarrinho}
              disabled={quantidade < 1 || quantidade > produto.quantidade - produto.quantidadeemlocacao}
              className="bg-[#c6a875] hover:bg-[#b39264] text-white px-6 py-3 rounded-lg w-full font-semibold shadow transition-all duration-300 disabled:opacity-50"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        {/* Produtos relacionados */}
        <section className="mt-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Você também pode gostar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProdutoRelacionado
              img={conjuntopvc1}
              titulo="Conjunto quadrado PVC"
              preco="R$ 50,00"
            />
            <ProdutoRelacionado img={cadeira1} titulo="Cadeira Tiffany" preco="R$ 5,00" />
            <ProdutoRelacionado img={mesa140} titulo="Mesa 1,20 m" preco="R$ 18,00" />
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <Footer/>
    </>
  );
};

export default DetalhesDoProduto;
