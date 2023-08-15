import { ChangeEvent } from 'react';

type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: boolean;
};

export const CheckBox = ({ onChange, value }: InputProps) => {
  return <input onChange={onChange} type="checkbox" checked={value}></input>;
};
