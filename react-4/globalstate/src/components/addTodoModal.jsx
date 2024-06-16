import { useContext } from "react"
import { TodoContext } from "../context/todo.context"


const AddTodoModal = () => {

    // const todo = useContext(TodoContext)
    const {todos, setTodos} = useContext(TodoContext)
    // 처음에 createContext 로 만들어준 것 받아온 것이다 (createContext 만들어준 공간을 사용하는 것이다)

    console.log(todos, "add-modal")  //-->  "add-modal" 은 TodoList 컴포넌트와 구분해주기 위해 문자열로 넣어준 것

    return <div>
        <button onClick={() => {
            setTodos([...todos,{
                id: Math.floor(Math.random() * 1000000),
                title: "test",
                content: "test",
                state: false
            }
        ])
        }}>추가</button> {/*추가 버튼 누를 대마다 todos 상태 배열의 요소가 추가되는 것이다*/}
        {/*여기서 추가했을 때, TodoList 컴포넌트의 todos 상태에도 요소가 추가된다면, 같은 상태를 사용하고 있다는 것을 알 수 있다  -->  전역상태*/}
    </div>
}
export default AddTodoModal