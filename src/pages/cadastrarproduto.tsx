// ...existing code...
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PackagePlus, ImagePlus } from "lucide-react";

interface Product {
  _id?: string;
  nome: string;
  categoria?: string;
  subcategoria?: string;
  quantidade: number;
  quantidadeemlocacao?: number;
  preco: string; // mantive string para compatibilidade com backend atual
  descricao?: string;
  imagem?: string; // URL or filename
}

export default function CadastrarProduto() {
  const [product, setProduct] = useState<Product>({
    nome: "",
    categoria: "",
    subcategoria: "",
    quantidade: 0,
    quantidadeemlocacao: 0,
    preco: "",
    descricao: "",
    imagem: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Cadastrar Produto";
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!product.nome.trim()) e.nome = "Nome é obrigatório.";
    if (!product.categoria?.trim()) e.categoria = "Categoria é obrigatória.";
    if (!product.descricao?.trim()) e.descricao = "Descrição é obrigatória.";
    if (!product.preco || isNaN(Number(product.preco.toString().replace(",", ".")))) e.preco = "Preço inválido.";
    if (product.quantidade < 0) e.quantidade = "Quantidade deve ser >= 0.";
    return e;
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "quantidade" || name === "quantidadeemlocacao") {
      setProduct((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "preco") {
      // allow comma or dot, keep value as string for backend
      const cleaned = value.replace(/[^\d,.-]/g, "");
      setProduct((prev) => ({ ...prev, preco: cleaned }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageInput = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Envie um arquivo de imagem válido.");
      return;
    }
    setImageFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleImageInput(f);
  };

  const formatPriceForDisplay = (v: string) => {
    if (!v) return "";
    const numeric = Number(v.toString().replace(",", "."));
    if (isNaN(numeric)) return v;
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numeric);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      toast.error("Corrija os erros antes de enviar.");
      return;
    }

    setSubmitting(true);
    try {
      // se quiser enviar imagem como multipart/form-data
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("nome", product.nome);
        formData.append("categoria", product.categoria || "");
        formData.append("descricao", product.descricao || "");
        formData.append("quantidade", String(product.quantidade));
        formData.append("quantidadeemlocacao", String(product.quantidadeemlocacao || 0));
        formData.append("preco", product.preco.toString().replace(",", "."));
        // endpoint que aceite multipart (ajuste conforme backend)
        await axios.post("http://localhost:8080/api/products/register-with-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const produtoFinal = {
          ...product,
          preco: parseFloat((product.preco || "0").toString().replace(",", ".")),
        };
        await axios.post("http://localhost:8080/api/products/register", produtoFinal, {
          headers: { "Content-Type": "application/json" },
        });
      }

      toast.success("Produto cadastrado com sucesso!");
      setProduct({
        nome: "",
        categoria: "",
        subcategoria: "",
        quantidade: 0,
        quantidadeemlocacao: 0,
        preco: "",
        descricao: "",
        imagem: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error("Erro ao cadastrar produto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <PackagePlus className="w-7 h-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Cadastrar Produto</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Nome</label>
                <input
                  name="nome"
                  value={product.nome}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-md transition ${errors.nome ? "border-red-400" : "border-gray-200"} focus:ring-2 focus:ring-blue-50`}
                />
                {errors.nome && <div className="text-sm text-red-500 mt-1">{errors.nome}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Categoria</label>
                  <input
                    name="categoria"
                    value={product.categoria}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border rounded-md ${errors.categoria ? "border-red-400" : "border-gray-200"}`}
                  />
                  {errors.categoria && <div className="text-sm text-red-500 mt-1">{errors.categoria}</div>}
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Imagem (URL ou upload)</label>
                  <div className="flex gap-2">
                    <input name="imagem" value={product.imagem} onChange={handleChange} className="w-full p-3 border rounded-md" placeholder="URL da imagem (opcional)" />
                    <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-md cursor-pointer">
                      <ImagePlus className="w-5 h-5 text-gray-600" />
                      <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                      <span className="text-sm text-gray-600">Upload</span>
                    </label>
                  </div>
                  {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 w-28 h-20 object-cover rounded" />}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={product.descricao}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-md min-h-[100px] ${errors.descricao ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.descricao && <div className="text-sm text-red-500 mt-1">{errors.descricao}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Quantidade</label>
                  <input type="number" name="quantidade" value={product.quantidade} min={0} onChange={handleChange} className="w-full p-3 border rounded-md" />
                  {errors.quantidade && <div className="text-sm text-red-500 mt-1">{errors.quantidade}</div>}
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Quantidade em locação</label>
                  <input type="number" name="quantidadeemlocacao" value={product.quantidadeemlocacao} min={0} onChange={handleChange} className="w-full p-3 border rounded-md" />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Preço</label>
                  <input
                    name="preco"
                    value={product.preco}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border rounded-md ${errors.preco ? "border-red-400" : "border-gray-200"}`}
                    placeholder="ex: 49.90"
                  />
                  <div className="text-sm text-gray-500 mt-1">{product.preco ? formatPriceForDisplay(product.preco) : "Formato: 49.90"}</div>
                  {errors.preco && <div className="text-sm text-red-500 mt-1">{errors.preco}</div>}
                </div>
              </div>

              <div className="flex gap-2">
                <button type="submit" disabled={submitting} className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-lg disabled:opacity-60">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                      Salvando...
                    </span>
                  ) : (
                    "Salvar Produto"
                  )}
                </button>

                <button type="button" onClick={() => { setProduct({ nome: "", categoria: "", subcategoria: "", quantidade: 0, quantidadeemlocacao: 0, preco: "", descricao: "", imagem: "" }); setImageFile(null); setImagePreview(null); }} className="px-6 py-3 bg-gray-100 rounded-xl">
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}