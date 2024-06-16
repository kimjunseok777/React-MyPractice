import { useContext } from "react"
import { TodoContext } from "../context/todo.context"


const TodoList = () => {

    // const todo = useContext(TodoContext)
    const {todos, setTodos} = useContext(TodoContext)  //-->  반환 값이 객체이기에 구조분해할당 해준 것이다 (데이터를 객체로 보냈었다)
    // 처음에 createContext 로 만들어준 것 받아온 것이다 (createContext 만들어준 공간을 사용하는 것이다)

    // console.log(todo, "todo-list")  //-->  "todo-list" 는 AddTodoModal 컴포넌트와 구분해주기 위해 문자열로 넣어준 것
    console.log(todos, "todo-list")

    //==>  "add-modal" , "todo-list" 이 콘솔창에 함께 뜨면서 배열의 요소가 동일하게 추가된다  -->  같은 상태(todos)를 공유하고 있다는 의미이다

    return <div>:)</div>
}
export default TodoList
