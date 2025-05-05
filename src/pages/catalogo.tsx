import React from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Catalago: React.FC<{ setCart: any }> = ({ setCart }) => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);
  const productsPerPage = 7;

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/produtos"); // sua API Gin
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (productId: number, quantity: number) => {
    if (quantity <= 0) return;

    setCart((prevCart: any) => {
      const existingProduct = prevCart.find((item: any) => item.id === productId);
      if (existingProduct) {
        return prevCart.map((item: any) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = products.find((p) => p.id === productId);
        return [...prevCart, { id: productId, name: product?.name || "", quantity }];
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
    return true;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const subcategories = Array.from(
    new Set(
      products
        .filter((product) => product.category === selectedCategory)
        .map((product) => product.subcategory)
    )
  ).filter(Boolean);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gray-100 w-full min-h-screen pt-6" style={{ marginBottom: "20px" }}>
        {/* Filtros */}
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
            }}
            disabled={!selectedCategory}
          >
            <option value="">Todas as Subcategorias</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>

        {/* Loading / Erro */}
        {loading && <p>Carregando produtos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Produtos */}
        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {currentProducts.map((product) => (
              <div
                key={product.id}
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
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                    borderRadius: "5px",
                    backgroundColor: "#f0f0f0",
                  }}
                />
                <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{product.name}</h3>
                <p style={{ fontSize: "16px", color: "#333" }}>{product.price}</p>
                <p style={{ fontSize: "14px", color: "#666" }}>{product.descrion}</p>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    defaultValue="1"
                    id={`quantity-${product.id}`}
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
                      backgroundColor: "#6c63ff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const quantityInput = document.getElementById(
                        `quantity-${product.id}`
                      ) as HTMLInputElement;
                      const quantity = parseInt(quantityInput.value, 10);
                      addToCart(product.id, quantity);
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {!loading && !error && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  backgroundColor: currentPage === index + 1 ? "#6c63ff" : "#ddd",
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default Catalago;
