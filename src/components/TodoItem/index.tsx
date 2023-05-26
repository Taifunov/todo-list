import { ITodo } from '../../types/todo.types';

type Props = {
  todo: ITodo;
  toggleComplete: (id: string) => void;
};

export const TodoItem = ({ todo, toggleComplete }: Props) => {
  return (
    <>
      <li key={todo.id} onClick={() => toggleComplete(todo.id)}>
        {todo.completed ? <s>{todo.name}</s> : todo.name}
      </li>
    </>
  );
};
