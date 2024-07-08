import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../../store/todo.slice"; //-->  상태를 변경시키기 위해 import 받아온 것들이다 (dispatch 사용할 때 쓴다)
// import { useTodo } from "../../../store/todo.store";

const OneTodo = ({todo}) => {

    // const { todos, setTodos } = useTodo()
    const dispatch = useDispatch() //--> "react-redux" 에서 import 받은 것이다
    // 부모에서 props 로 전달받은 todo 로 상태변화 요직을 모두 해결하기 때문에, 따로 useSelector 사용하지 않은 걸 확인할 수 있다

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 삭제 :
    const onPressDeleteTodo = () => {
        const todoId = todo.id

        // 원래 쓰던 전역상태요직 삭제해주고, 객체를 전달하는 dispatch 넣어준 것이다
        // 이렇게 앞에서 만들었던 reducer 의 key 값인 deleteTodo 이것만 import 받아서 사용하면 되는 것이다 (그래서 여기서는 따로 useSelector 사용하지 않은 것이다)
        dispatch(deleteTodo({
            id: todoId //-->  "action.payload.id" 했다면 이렇게 하면 된다  -->  따로 todoId 선언해주지 않고, 여기다가 todo.id 적어도 된다
            // 이게 아니라 slice 만들 때 "action.payload" 이렇게 했다면  -->  deleteTodo(todoId) 이렇게 객체 전달하면 된다
            //==>  상태변화 함수 안에 있는 내용물은 action 이라는 이름의 객체로 전달되는 것이다
        }))
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 수정 :
    const [isEditMode, setIsEditMode] = useState(false)
    const contentRef = useRef()

    const onPressChangeEditMode = () => {
        setIsEditMode(true)
    }

    const onPressEdit = () => {
         const todoId = todo.id
         const content = contentRef.current.value

        dispatch(updateTodo({
            id: todoId,
            content
        }))

        setIsEditMode(false)
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <S.Wrapper state={todo.state}>
            <S.Header>
                <div>
                    {todo.state ? "완료" : "미완료"}
                    {todo.title}
                </div>
                <div>
                    <button onClick={isEditMode ? onPressEdit : onPressChangeEditMode}>
                        {isEditMode ? "완료" : "수정"}
                    </button>
                    <button onClick={onPressDeleteTodo}>삭제</button>
                </div>
            </S.Header>
            {isEditMode ? <textarea ref={contentRef} defaultValue={todo.content}></textarea> : <S.Content state={todo.state}>{todo.content}</S.Content>}
        </S.Wrapper>
        )
}
export default OneTodo


const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid #999;
    margin: 16px 0;
    border-radius: 8px;
    background-color: ${({ state, theme }) =>
        state ? theme.colors.Gray[1] : theme.colors.text.white};
`;
const Header = styled.div`
    border-bottom: 1px dotted #999;
    ${flexAlignCenter};
    justify-content: space-between;
    padding: 8px 16px;
    height: 48px;
`;
const Content = styled.div`
    padding: 16px;
    text-decoration: ${({ state }) => (state ? "line-through" : "none")};
`;
const S = {
    Wrapper,
    Header,
    Content,
};
