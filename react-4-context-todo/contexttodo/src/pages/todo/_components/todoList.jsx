import styled from "styled-components"
import OneTodo from "./oneTodo"
import { useTodo } from "../../../store/todo.store"

const TodoList = () => {

    const {todos, setTodos} = useTodo()
    //-->  전역상태 만든 것 import 받아와준 것


    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // // 삭제 :
    // // 여기서 deleteTodo 함수를 만들어 주고, oneTodo.jsx 로 속성으로 전달 해서, 클릭 이벤트로 매개변수를 전달받는 함수가 되는 것이다
    // const deleteTodo = (todoId) => {
    //     const filterTodo = todos.filter((todo) => todo.id !== todoId)
    //     setTodos(filterTodo)
    // }

    
    // // 수정 :
    // // 수정 요직 만들기 위해 updateTodo 함수 만들어서 oneTodo.jsx 로 속성으로 전달해준 것 (todos, setTodos 가 todoList.jsx 에 있기에 여기서 만들어 주고 전달한 것)
    // const updateTodo = ({todoId, content}) => {
    //     const temp_todos = [...todos]
    //     let selectTodoIndex = temp_todos.findIndex((todo) => todo.id === todoId)

    //     temp_todos[selectTodoIndex] = {
    //         ...temp_todos[selectTodoIndex],
    //         content
    //     }
    //     setTodos(temp_todos)
    // }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------


    return (
        <S.Wrapper>
            {todos.map((todo)=>(
                <OneTodo key={todo.id} todo={todo}/>
            ))}
        </S.Wrapper>
    )
}
export default TodoList

const Wrapper = styled.div`
    padding: 32px 0;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const S = {
    Wrapper
}