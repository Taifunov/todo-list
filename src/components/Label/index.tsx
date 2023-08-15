import styles from './Label.module.css';

type LabelProps = {
  text?: string;
};

export const Label = ({ text }: LabelProps) => {
  return <label className={styles.label}>{text}</label>;
};
