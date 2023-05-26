import { TodoList } from './components/TodoList';
import './App.css';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
}
