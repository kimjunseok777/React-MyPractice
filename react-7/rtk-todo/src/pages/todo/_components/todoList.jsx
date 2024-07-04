import styled from "styled-components"
import OneTodo from "./oneTodo"
import { useSelector } from "react-redux"
// import { useTodo } from "../../../store/todo.store"

const TodoList = () => {


    // const {todos, setTodos} = useTodo()  //-->  contextAPI 로 만들어준 전역상태이다

    const todos = useSelector((store) => store.todo.todo)
    //-->  앞에 있는 todo 는 우리가 정해준 key 값이고, 뒤에 있는 todo 는 initialState 객체 안에 있는 배열인 todo 이다
    // 1번째 todo : reducer 안에 만들어준 key 값
    // 2번째 todo : initialState = { todo = [ ] }  -->  initialState 안에 있는 배열인 key 값
    

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