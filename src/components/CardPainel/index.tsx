import React from 'react';
import styles from './styles.module.css'

interface CarcProps {
  title?: string;
  content: string;
}

function CardPainel({ title, content }: CarcProps) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {content}
    </div>
  );
}

export default CardPainel;
