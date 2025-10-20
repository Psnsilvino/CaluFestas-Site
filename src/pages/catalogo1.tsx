// ...existing code...
import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

interface Product {
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

const CatalagoMock: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);
  const productsPerPage = 8;

  // 🔹 Dados simulados (mock)
  const products: Product[] = [
    {
      _id: "1",
      nome: "Cadeira Tiffany Branca",
      preco: 25.0,
      descricao: "Ideal para eventos e casamentos.",
      imagem: "",
      categoria: "Cadeiras",
      subcategoria: "Tiffany",
      quantidade: 50,
      quantidadeemlocacao: 10,
    },
    {
      _id: "2",
      nome: "Mesa Redonda de Madeira",
      preco: 60.0,
      descricao: "Mesa clássica para 6 lugares.",
      imagem: "https://images.unsplash.com/photo-1616627451824-5fef2c2c248a?w=400",
      categoria: "Mesas",
      subcategoria: "Madeira",
      quantidade: 20,
      quantidadeemlocacao: 5,
    },
    {
      _id: "3",
      nome: "Toalha Branca",
      preco: 10.0,
      descricao: "Tecido leve e elegante.",
      imagem: "https://images.unsplash.com/photo-1598032896433-e4f885fdf2c3?w=400",
      categoria: "Toalhas",
      subcategoria: "Brancas",
      quantidade: 100,
      quantidadeemlocacao: 15,
    },
    {
      _id: "4",
      nome: "Taça de Cristal",
      preco: 8.0,
      descricao: "Taça elegante para brindes.",
      imagem: "https://images.unsplash.com/photo-1606311842224-495f742b3e2f?w=400",
      categoria: "Copos",
      subcategoria: "Cristal",
      quantidade: 80,
      quantidadeemlocacao: 12,
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.categoria !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategoria !== selectedSubcategory) return false;
    return true;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const categories = Array.from(new Set(products.map((p) => p.categoria))).filter(Boolean);
  const subcategories = Array.from(
    new Set(products.filter((p) => p.categoria === selectedCategory).map((p) => p.subcategoria))
  ).filter(Boolean);

  return (
    <>
      <Navbar />
       <div className="flex flex-col items-center w-full min-h-screen pt-6" style={{ marginBottom: 0, backgroundColor: '#F7F3EA' }}>
 <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              setSelectedSubcategory(null);
              setCurrentPage(1);
            }}
            style={{
              padding: "10px",
              marginRight: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#ffffff", // fundo branco
            }}
          >
            <option value="">Todas as Categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedSubcategory || ""}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value || null);
              setCurrentPage(1);
            }}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#ffffff", // fundo branco
            }}
            disabled={!selectedCategory}
          >
            <option value="">Todas as Subcategorias</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>

        {/* Produtos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {currentProducts.map((product) => {
            const maxAvailable = Math.max(0, (product.quantidade || 0) - (product.quantidadeemlocacao || 0));
            return (
              <div
                key={product._id}
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={product.imagem || "https://via.placeholder.com/400x300?text=Sem+imagem"}
                  alt={product.nome}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    backgroundColor: "#f0f0f0",
                  }}
                />
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{product.nome}</h3>
                <p style={{ fontSize: "16px", color: "#333" }}>R${product.preco}</p>
                <p style={{ fontSize: "14px", color: "#666" }}>{product.descricao}</p>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "8px" }}>
                  <input
                    type="number"
                    min={0}
                    max={maxAvailable}
                    defaultValue="0"
                    id={`quantity-${product._id}`}
                    style={{
                      width: "60px",
                      padding: "5px",
                      marginRight: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#c6a875",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => alert(`Adicionado ${product.nome} ao carrinho!`)}
                  >
                    Adicionar ao Carrinho
                  </button>

                  {/* Botão Mais detalhes — navega para página de produto */}
                  <button
                    style={{
                      padding: "10px 12px",
                      backgroundColor: "#fff",
                      color: "#333",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/detalhesdoproduto/${product._id}`)}
                  >
                    Mais detalhes
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginação */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                backgroundColor: currentPage === index + 1 ? "#c6a875" : "#ddd",
                color: currentPage === index + 1 ? "white" : "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatalagoMock;
// ...existing code...