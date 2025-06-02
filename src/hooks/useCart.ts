// src/hooks/useCart.ts
import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";

interface CartItem {
  _id: string,
  nome: string;
  quantidade: number;
  preco: string | number;
  descricao: string;
  imagem: string;
}

const CART_KEY = "cart";

export function useCart() {
  // ---------- carregar do localStorage ----------
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ---------- salvar a cada mudança ----------
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // ---------- espelhar alterações vindas de OUTRAS abas ----------
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        setCart(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // ---------- operações públicas ----------
  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      return existing
        ? prev.map((i) =>
            i._id === product._id
              ? { ...i, quantity: i.quantidade + quantity }
              : i
          )
        : [...prev, { _id: product._id, nome: product.nome, quantidade: quantity, descricao: product.descricao, preco: product.preco, imagem: product.imagem }];
    });
  };

  const removeFromCart = (_id: string) =>
    setCart((prev) => prev.filter((i) => i._id !== _id));

  const changeQuantity = (_id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(_id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i._id === _id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, changeQuantity, clearCart };
}
