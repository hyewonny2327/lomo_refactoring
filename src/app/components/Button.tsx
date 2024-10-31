import React, { ReactNode } from 'react';
import styles from '../styles/button.module.scss';
type buttonType = {
  type: 'outlined' | 'colored';
  size: 'small' | 'large';
  color: 'primary' | 'black';
  children: ReactNode;
  onClick?: () => void;
};
const Button = ({ type, size, color, children, onClick }: buttonType) => {
  return (
    <button
      className={`${styles.button} ${styles[`button__type__${type}__${color}`]} ${styles[`button__size__${size}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
