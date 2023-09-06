/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import styles from './styles.module.css';
import Modal from '../Modal';
import { Button } from '../Button';

const Carrinho = () => {
  const { cart, removeProduct, addToCart,  } = useCarrinho();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const handleAmount = (product, productId, newAmount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newAmount,
    }));

    addToCart(product);
  };

  const handleRemoveAmount = (product, productId, newAmount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newAmount,
    }));

    removeProduct(product);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add(styles.disableScroll)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove(styles.disableScroll)
  };

  return (
    <div>
      <div className={styles.botaoCarrinho} >
        <Button onClick={openModal}>Abrir Carrinho</Button>
      </div>

      {isModalOpen && (
        <Modal props={{ toggleModal: closeModal }}>
          <div className="modal">
            <div className="modal-content">
              <h2 className={styles.titleName}>Seu Carrinho</h2>
              {cart.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
              ) : (
                <ul>
                {cart.map((product) => (
                  <li key={product.id} className={styles.cartItem}>
                    <div>
                      <img src={product.image} alt={product.title} className={styles.imgCart} />
                    </div>
                    <div className={styles.contentProduct}>
                      <h5 className={styles.cartTitle}>{product.title}</h5>
                      <p className={styles.cartPreco}>Preço: R${product.price.toFixed(2)}</p>
                      <p className={styles.cartPreco}>Quantidade: { quantities[product.id] + 1  || product.amount}</p>
                      <p className={styles.cartPreco}>Total: R${product.total.toFixed(2)}</p>
                    </div>
                    <div className={styles.buttonGroup}>
                      <Button onClick={() => handleRemoveAmount(product, product.id, (quantities[product.id] - product.amount) )} style={{marginRight: '5px'}}> - </Button>
                      <Button onClick={() => handleAmount(product, product.id, (quantities[product.id] + product.amount) )}>+</Button>
                    </div>
                  </li>
                ))}
              </ul>
              )}
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Carrinho;