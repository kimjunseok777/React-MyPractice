import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../../store/todo.slice"; //-->  상태를 변경시키기 위해 import 받아온 것들이다 (dispatch 사용할 때 쓴다)
// import { useTodo } from "../../../store/todo.store";

const OneTodo = ({todo}) => {

    const dispatch = useDispatch()

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 삭제 :
    const onPressDeleteTodo = async () => {
        const todoId = todo.id //-->  이 투두 아이디를 백엔드(msw) 로 보내면 되는 것이다
        const response = await fetch(`/api/todo/${todoId}`, { //-->  굳이 todoId 로 선언 안 해주고 todo.id 로 작성해도 된다
            method: "delete"
        })
        const data = await response.json()
        // console.log(data.body)
        
        dispatch(deleteTodo(data.body))
        // dispatch(deleteTodo({ id : data.body.id }))  //-->  이렇게 해줘도 된다
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 수정 :
    const [isEditMode, setIsEditMode] = useState(false)
    const contentRef = useRef()

    const onPressChangeEditMode = () => {
        setIsEditMode(true)
    }

    // msw 수정 :
    const onPressEdit = async() => {
        const todoId = todo.id
        const content = contentRef.current.value

        //------------------------------------------------------------------------------------------------------
        // 수정 :
        const response = await fetch(`/api/todo?todoId=${todoId}`, {
            method: "patch",
            body: JSON.stringify({
                content
            })
        })
        const data = await response.json()
        // console.log(data)

        dispatch(updateTodo({
            id: parseInt(data.todoId), //--> 수정 부분에서는 dispatch 를 보낼 때 parseInt 를 해줬다 (todo.api.js 또는 todo.slice.js 에서 해줘도 된다)
            content: data.content
        }))
        //------------------------------------------------------------------------------------------------------

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
