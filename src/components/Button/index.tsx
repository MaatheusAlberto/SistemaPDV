import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  disabled?: boolean;
  children: ReactNode;
}

export function Button({ disabled, children, ...props}: ButtonProps){
  return (
    <button 
      className={styles.button}
      disabled={disabled}
      {...props}
    >
      <a className={styles.buttonText}>
        {children}
      </a>
    </button>
  )
}