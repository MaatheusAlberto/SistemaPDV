import React from "react";
import styles from "./styles.module.css";

export default function Modal({props, children}) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={props.toggleModal}>X</button>
        {children}
      </div>
    </div>
  );
}
