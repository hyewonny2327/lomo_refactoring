import React from 'react';
import styles from '../styles/input.module.scss';

type inputPropsType = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
};
const Input = ({ value, placeholder, onChange, type }: inputPropsType) => {
  return (
    <div className={styles.inputContainer}>
      <input value={value} placeholder={placeholder} className={styles.inputBox} onChange={onChange} type={type} />
    </div>
  );
};

export default Input;
