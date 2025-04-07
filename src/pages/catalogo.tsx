import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Catalago: React.FC<{ setCart: any }> = ({ setCart }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);
  const productsPerPage = 7; // Número de produtos por página

  const products = [
    {
  //Conjuntos 
      //PVC
      id: 1,
      name: "Conjunto mesa de PVC",
      price: "R$20,00",
      stock: 10,
      descrion: "Mesa de PVC quadrada com 4 cadeiras.",
      image: "https://imgur.com/AwNCdmc.jpg",
      category: "Conjuntos",
      subcategory: "PVC",
    },
    {
      id: 2,
      name: "Conjunto de mesa de PVC",
      price: "R$20,00",
      stock: 10,
      descrion: "Mesa de PVC redonda com 4 cadeiras.",
      image: "https://imgur.com/GuCyEmy.jpg",
      category: "Conjuntos",
      subcategory: "PVC",
    },
    //Tampo + estrutura de ferro 
    {
      id: 3,
      name: "Conjunto de mesa 1,50",
      price: "R$85,00",
      stock: 6,
      descrion: "Mesa de 1,50 com 10 cadeiras + toalhas",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
    },
    {
      id: 4,
      name: "Conjunto de mesa 1,40",
      price: "R$75,00",
      stock: 16,
      descrion: "Mesa de 1,40 com 8 cadeiras + toalhas",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
    },
    {
      id: 5,
      name: "Conjunto de mesa 1,30",
      price: "R$70,00",
      stock: 6,
      descrion: "Mesa de 1,30 com 7 cadeiras + toalhas",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
    },
    {
      id: 6,
      name: "Conjunto de mesa 1,20",
      price: "R$65,00",
      stock: 20,
      descrion: "Mesa de 1,30 com 6 cadeiras + toalhas",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
    },
    //Demolição
    {
      id: 7,
      name: "Conjunto de Mesa Retangular de Demolição",
      price: "R$280,00",
      stock: 2,
      descrion: "Mesa Retangular de Demolição com 8 cadeiras",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
      subcategory: "Demolição",
    },
    {
      id: 8,
      name: "Conjunto de Mesa Quadrada de Demolição",
      price: "R$280,00",
      stock: 1,
      descrion: "Mesa Quadrada de Demolição de 1,50 x 1,50 com 8 cadeiras",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
      subcategory: "Demolição",
    },
    {
      id: 9,
      name: "Conjunto de Mesa Redonda de Demolição",
      price: "R$280,00",
      stock: 1,
      descrion: "Mesa Quadrada de Demolição com 8 cadeiras",
      image: "https://via.placeholder.com/150/3357FF",
      category: "Conjuntos",
      subcategory: "Demolição",
    },
    //Bistrôs
    {
      id: 10,
      name: "Conjunto de Mesa Bistrô",
      price: "R$",
      stock: 10,
      descrion: "Mesa Bistrô com 4 Banquetas",
      image: "https://imgur.com/dJt3MEm.jpg",
      category: "Conjuntos",
      subcategory: "Bistrôs",
    },
  //Cadeiras
    {
      id: 11,
      name: "Cadeira Tiffany",
      price: "R$8,00",
      stock: 150,
      descrion: "Estrutura de Madeira com almofada",
      image: "https://imgur.com/3rwWQDt.jpg",
      category: "Cadeiras",
      subcategory: "",
    },
    {
      id: 12,
      name: "Cadeira de Ferro",
      price: "R$8,00",
      stock: 198,
      descrion: "Estrutura de Ferro Branca com Almofada",
      image: "https://imgur.com/0cM9Dh9.jpg",
      category: "Cadeiras",
      subcategory: "",
    },
    {
      id: 13,
      name: "Cadeira de PVC",
      price: "R$",
      stock: 40,
      descrion: "Cadeira de Plástico",
      image: "https://imgur.com/Ev8m6VL.jpg",
      category: "Cadeiras",
      subcategory: "",
    },
    {
      id: 14,
      name: "Cadeira de Demolição",
      price: "R$",
      stock: 32,
      descrion: "Cadeira de Madeira",
      image: "https://imgur.com/Ev8m6VL",
      category: "Cadeiras",
      subcategory: "",
    },
  //Mesas 
  {
    id: 15,
    name: "Mesa de 1,50 de Diametro",
    price: "R$20,00",
    stock: 6,
    descrion: "Tampo de Madeira com estrutura de Ferro",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
  {
    id: 16,
    name: "Mesa de 1,40 de Diametro",
    price: "R$18,00",
    stock: 16,
    descrion: "Tampo de Madeira com estrutura de Ferro",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
  {
    id: 17,
    name: "Mesa de 1,30 de Diametro",
    price: "R$18,00",
    stock: 6,
    descrion: "Mesa de Madeira com estrutura de Ferro",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
  {
    id: 18,
    name: "Mesa de 1,20 de Diametro",
    price: "R$ 16,00",
    stock: 20,
    descrion: "Mesa de Madeira com estrutura de Ferro",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
  {
    id: 19,
    name: "Prancha de 2.20 x 1.10",
    price: "R$50,00",
    stock: 5,
    descrion: "Mesa de Maderia Buffet ou 10 Cadeiras",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
  {
    id: 20,
    name: "Prancha de 2.20 x 0.90",
    price: "R$45,00",
    stock: 45,
    descrion: "Mesa de Madeira Buffet ou 10 Cadeiras",
    image: "https://imgur.com/Ev8m6VL",
    category: "Mesas",
    subcategory: "",
  },
//Demolição

  ];

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
  );

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
              setSelectedSubcategory(null); // Resetar subcategoria ao mudar categoria
              setCurrentPage(1); // Resetar para a primeira página
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
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedSubcategory || ""}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value || null);
              setCurrentPage(1); // Resetar para a primeira página
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
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
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
    width: "100%", // Ajusta a largura da imagem
    height: "300px", // Define uma altura fixa
    objectFit: "contain", // Exibe a imagem inteira sem cortes
    borderRadius: "5px", // Cantos arredondados
    backgroundColor: "#f0f0f0", // Fundo para preencher áreas vazias
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

        {/* Paginação */}
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
      </div>
      <Footer />
    </>
  );
};

export default Catalago;