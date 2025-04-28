import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/NavBar"; // Certifique-se de que o caminho está correto

interface Product {
  name: string;
  photo: File | null;
  description: string;
  quantity: number;
}

export default function CadastrarProduto() {
  const [product, setProduct] = useState<Product>({
    name: "",
    photo: null,
    description: "",
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({
        ...prev,
        photo: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto cadastrado:", product);
    // Aqui você pode enviar o produto para o backend (API)
  };

  return (
    <>
      <Head>
        <title>Cadastrar Produto</title>
      </Head>
      <Navbar /> {/* Adicionando o Navbar aqui */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-20 w-full max-w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Produto</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nome do Produto</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Foto do Produto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {product.photo && (
                <img
                  src={URL.createObjectURL(product.photo)}
                  alt="Prévia da imagem"
                  className="mt-2 h-32 object-cover rounded-md"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Descrição do Produto</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Quantidade</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mx-auto mt-4"
            >
              Salvar Produto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}