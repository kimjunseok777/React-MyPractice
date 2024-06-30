import styled from "styled-components"
import OneTodo from "./oneTodo"
import { useTodo } from "../../../store/todo.store"

const TodoList = () => {

    const {todos, setTodos} = useTodo()
    

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