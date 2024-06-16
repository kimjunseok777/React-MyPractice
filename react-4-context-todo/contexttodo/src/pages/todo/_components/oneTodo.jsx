import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";
import { useRef, useState } from "react";
import { useTodo } from "../../../store/todo.store";

const OneTodo = ({todo}) => {

    const {todos, setTodos} = useTodo()
    //-->  deleteTodo 와 updateTodo 함수들을 본래 쓰이던 OneTodo 컴포넌트에서 생성해서 사용할 수 있게 된다 (전역상태 사용함으로 가능해진다)
    //-->  함수에 있는 기능을 서로 붙여넣어서 "삭제함수 1개" , "수정함수 1개" 로 만들어주자

    // 삭제 :
    // 여기서 deleteTodo 함수를 만들어 주고, oneTodo.jsx 로 속성으로 전달 해서, 클릭 이벤트로 매개변수를 전달받는 함수가 되는 것이다
    const deleteTodo = (todoId) => {
        // const filterTodo = todos.filter((todo) => todo.id !== todoId)
        // setTodos(filterTodo)
    }

    // 수정 :
    // 수정 요직 만들기 위해 updateTodo 함수 만들어서 oneTodo.jsx 로 속성으로 전달해준 것 (todos, setTodos 가 todoList.jsx 에 있기에 여기서 만들어 주고 전달한 것)
    const updateTodo = ({todoId, content}) => {
        // const temp_todos = [...todos]
        // let selectTodoIndex = temp_todos.findIndex((todo) => todo.id === todoId)

        // temp_todos[selectTodoIndex] = {
        //     ...temp_todos[selectTodoIndex],
        //     content
        // }
        // setTodos(temp_todos)
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    // 삭제 :
    const onPressDeleteTodo = () => {
        const todoId = todo.id //-->  원래 매개변수로 받아서 사용해줬는데, 함수 합쳐주면서 매개변수가 아닌, 그냥 변수로 만들어준 것이다
        const filterTodo = todos.filter((todo) => todo.id !== todoId)
        setTodos(filterTodo)
    }

    // 수정 :
    const [isEditMode, setIsEditMode] = useState(false)

    const contentRef = useRef()

        //-->  수정 모드 여는 것
    const onPressChangeEditMode = () => {
        setIsEditMode(true)
    }

        //-->  수정 모드 끄는 것 (수정 모드 완료하는 것)
    const onPressEdit = () => {

        const todoId = todo.id //-->  매개변수로 받아서 실행하던 것, 변수로 만들어 준것
        const content = contentRef.current.value //-->  매개변수로 받아서 실행하던 것, 변수로 만들어 준것

        //--------------------------------- 함수 합쳐준 부분
        const temp_todos = [...todos]
        let selectTodoIndex = temp_todos.findIndex((todo) => todo.id === todoId)

        temp_todos[selectTodoIndex] = {
            ...temp_todos[selectTodoIndex],
            content
        }
        setTodos(temp_todos)
        //-------------------------------------------------
        // updateTodo({
        //     todoId: todo.id,
        //     content: contentRef.current.value
        // })
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
