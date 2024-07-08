import styled from "styled-components"
import OneTodo from "./oneTodo"
import { useSelector } from "react-redux"
// import { useTodo } from "../../../store/todo.store"

const TodoList = () => {


    // const {todos, setTodos} = useTodo()  //-->  contextAPI 로 만들어준 전역상태이다 (이제 사용 안 함  -->  rtk 사용할 거임)

    const todos = useSelector((store) => store.todo.todo)
    //-->  앞에 있는 todo 는 내가 정해준 key 값이고, 뒤에 있는 todo 는 initialState 객체 안에 있는 배열인 todo 이다
    // 1번째 todo : reducer 안에 만들어준 key 값  -->  reducer: { todo : todoReducer }  -->  여기서 key 값인 todo 이다
    // 2번째 todo : initialState = { todo = [ ... ] }  -->  initialState 의 객체 안에 있는 배열인 key 값  -->  initialState = { todo : [ ... ] }
    //==>  즉, todo.slice.js 에 있는 initialState 에서 todo 배열이  "const todos"  에 담긴 것이다 (상태 받아와준 것)
    

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