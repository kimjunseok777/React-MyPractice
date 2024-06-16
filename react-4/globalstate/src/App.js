import './App.css';
import TodoProvider from './context/todo.context';
import AddTodoModal from './components/addTodoModal';
import TodoList from './components/todoList';

function App() {
  return (
    <TodoProvider>
        {/* 이 덮개 안에 있는 컴포넌트들은 내가 만든 전역상태를 공유할 수 있다 */}
        <AddTodoModal/>
        <TodoList/>
    </TodoProvider>
  );
}

export default App;
