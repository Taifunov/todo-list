import { ChangeEvent } from 'react';
import styles from './TextBox.module.css';

type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const TextBox = ({ onChange, value }: InputProps) => {
  return (
    <input
      className={styles['input']}
      onChange={onChange}
      type="text"
      value={value}
    ></input>
  );
};
