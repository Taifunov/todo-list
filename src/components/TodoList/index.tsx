import { useState } from 'react';
import { ITodo } from '../../types/todo.types';
import { TodoItem } from '../TodoItem';
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';

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

  const isTodoExists = (todoName: string) => {
    return todoList.some((todo) => todo.name === todoName);
  };

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
  };

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

  const onInputChange = (e: any) => {
    const { value } = e.target;

    if (value) {
      setError('');
    }

    setInputValue(value);
  };

  console.log({ error });

  return (
    <div className={styles['todo-list-container']}>
      <div className={styles['list-form']}>
        <div className={styles['show-active-todos']}>
          <input
            onChange={(e: any) => setIsShowActive(e.target.checked)}
            type="checkbox"
            checked={isShowActive}
          ></input>
          <label className={styles['label']}>Show only active todos</label>
        </div>

        <input
          className={styles['input']}
          onChange={onInputChange}
          type="text"
          value={inputValue}
        ></input>
        {error && <p className={styles['error-message']}>{error}</p>}

        <button
          className={styles['button']}
          onClick={handleAddClick}
          disabled={!inputValue || isLoading}
        >
          Add
        </button>
        <button className={styles['button']} onClick={handleCancelClick}>
          Cancel
        </button>
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
