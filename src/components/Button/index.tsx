import styles from './Button.module.css';

type IButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  text?: string;
};

export const Button = ({ onClick, disabled, text }: IButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
