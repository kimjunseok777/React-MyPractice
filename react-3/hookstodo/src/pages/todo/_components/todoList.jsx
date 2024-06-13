import styled from "styled-components"
import OneTodo from "./oneTodo"

const TodoList = ({todos}) => {
    return (
        <S.Wrapper>
            {todos.map((todo)=>(
                //--> 여기서 todo 는 todos 배열을 맵 돌린 것이다
                <OneTodo todo={todo}/>  //-->  map 을 돌렸기에 <OneTodo/> 컴포넌트가 두개 생기는 것이다 (속성 전달도 인덱스 따라서 재각각 달라진다)
                /*
                    여기서 OneTodo 의 속성으로 전달된 값은
                    {
                        id: 1,
                         title: "example-1",
                         content: "example-1",
                         state: true
                    }, ... 가 된다
                    -->  두번째 요소의 state 는 false 이다
                */
            ))}
        </S.Wrapper>
    )
}
export default TodoList


const Wrapper = styled.div`
    padding: 32px 0;  //-->  위 아래 패딩 32px
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const S = {
    Wrapper
}