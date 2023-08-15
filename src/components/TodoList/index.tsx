import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { ITodo } from '../../types/todo.types';
import { TodoItem } from '../TodoItem';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';
import { Button } from '../Button';
import { ButtonConfig } from '../../types/types';
import { TextBox } from '../TextBox';
import { CheckBox } from '../CheckBox';
import { Label } from '../Label';

const defaultTodoList: ITodo[] = [
  {
    id: '0',
    name: 'todo',
    completed: false,
  },
  {
    id: '1',
    name: 'todo1',
    completed: true,
  },
];

let addTodoTimeoutId: NodeJS.Timeout | null = null;

export const TodoList = () => {
  const [isShowActive, setIsShowActive] = useState(false);
  const [todoList, setTodoList] = useState<ITodo[]>(defaultTodoList);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const isTodoExists = useCallback(
    (todoName: string) => todoList.some((todo) => todo.name === todoName),
    [todoList]
  );

  const handleAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (isTodoExists(inputValue)) {
        setError('A todo with this name already exists.');
        return;
      }

      setIsLoading(true);

      addTodoTimeoutId = setTimeout(() => {
        setTodoList((prevState) => [
          ...prevState,
          { id: uuidv4(), name: inputValue, completed: false },
        ]);
        setInputValue('');
        setIsLoading(false);
      }, 1000);
    },
    [inputValue, isTodoExists]
  );

  const handleCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (addTodoTimeoutId) {
      clearTimeout(addTodoTimeoutId);
      addTodoTimeoutId = null;
      setIsLoading(false);
    }
  };

  const toggleComplete = (id: string) => {
    setTodoList((prevList) =>
      prevList.map((item) =>
        item.id !== id ? item : { ...item, completed: !item.completed }
      )
    );
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      setError('');
    }

    setInputValue(value);
  };

  const buttonConfig: ButtonConfig[] = useMemo(
    () => [
      {
        text: 'Add',
        onClick: handleAddClick,
        disabled: !inputValue || isLoading,
      },
      {
        text: 'Cancel',
        onClick: handleCancelClick,
      },
    ],
    [handleAddClick, inputValue, isLoading]
  );

  return (
    <div className={styles['todo-list-container']}>
      <div className={styles['list-form']}>
        <div className={styles['show-active-todos']}>
          <CheckBox
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsShowActive(e.target.checked);
            }}
            value={isShowActive}
          />
          <Label text="Show only active todos" />
        </div>

        <TextBox onChange={onInputChange} value={inputValue} />
        {error && <p className={styles['error-message']}>{error}</p>}
        {buttonConfig.map(({ onClick, disabled, text }: ButtonConfig) => (
          <Button
            key={text}
            onClick={onClick}
            disabled={disabled}
            text={text}
          />
        ))}
      </div>

      <ul className={styles['scrollable-list']}>
        {(isShowActive
          ? todoList.filter((todo) => !todo.completed)
          : todoList
        ).map((todo: ITodo) => (
          <TodoItem key={todo.id} toggleComplete={toggleComplete} todo={todo} />
        ))}
      </ul>
    </div>
  );
};
