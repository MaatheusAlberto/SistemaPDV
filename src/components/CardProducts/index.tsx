/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './styles.module.css'
import { Product } from '../../services/reactQuery';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { Button } from '../Button';

interface CardProductsProps {
  products: Product[];
}

export function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function CardProducts({ products }: CardProductsProps) {
  const { addToCart } = useCarrinho();

  const handleAddToCart = (item: Product) => {
    addToCart(item)
  };

  return (
    <>
      {products?.map((item) => (
        <div className={styles.productCard} key={item.id}>
          <img src={item.image} alt={item.title} width='50px' height='50px'/>
          <span className={styles.title}>{item.title}</span>
          <p className={styles.preco}>Preço: {formatPrice(item.price)}</p>
          <Button onClick={() => handleAddToCart(item)}>Adicionar ao Carrinho</Button>
        </div>
      ))}
    </>
  );
}

export default CardProducts;
