import React, { ReactNode, createContext, useContext, useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  amount: number;
  total: number
};

type CarrinhoContextData = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeProduct: (product: Product) => void;
};

type CarrinhoProviderProps = {
  children: ReactNode;
};


export const CarrinhoContext = createContext({} as CarrinhoContextData)

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart]; 

    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex !== -1) {

      updatedCart[existingProductIndex].amount += 1;
        updatedCart[existingProductIndex].total = updatedCart[existingProductIndex].amount * updatedCart[existingProductIndex].price;
    } else {

      const updatedProduct = {
        ...product,
        amount: 1,
        total: product.price,
      };
      updatedCart.push(updatedProduct);
    }
  
    setCart(updatedCart);
  };
  


  const removeProduct = (product: Product) => {
    const updatedCart = [...cart];
  
    const productIndex = updatedCart.findIndex((item) => item.id === product.id);
  
    if(cart[productIndex]?.amount > 1){
      let cartList = cart;

      cartList[productIndex].amount = cartList[productIndex].amount - 1

      cartList[productIndex].total = cartList[productIndex].total - cartList[productIndex].price

      setCart(cartList)

      return
    }

    const removeItem = cart.filter(item => item.id !== product.id)

    setCart(removeItem)

  };

  
  const contextValue: CarrinhoContextData = {
    cart,
    addToCart,
    removeProduct,
  };

  return (
    <CarrinhoContext.Provider value={contextValue}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}