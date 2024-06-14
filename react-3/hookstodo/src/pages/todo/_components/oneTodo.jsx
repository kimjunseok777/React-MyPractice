import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";
import { useRef, useState } from "react";

const OneTodo = ({todo, deleteTodo, updateTodo}) => {

    /*
        Delete(삭제) 요직 만들어보자  -->  여기다 setTodos 를 직접 옮겨도 되고, deleteTodo 라고하는 함수를 만들어서 전달 받아도 괜찮다

        ex)  const deleteTodo = (todoId) => setTodos(...)  -->  이 deleteTodo 라는 함수를 전달 받아도 괜찮고, setTodos 를 전달 받아도 괜찮다
                두가지 방법 다 props 로 전달받을 필요가 있다
    */

    const onPressDeleteTodo = () => {

        // const todoId = todo.id  //-->  todo.id 가 내가 삭제 버튼을 "클릭한" todo 의 id 값이다 (고유 식별 값  -->  이래서 id 는 겹치지 않는 선에서 존재해야한다)

        // const deleteTodo = todos.filter((todo) => todo.id !== todoId)  //-->  todo 의 id 가 todoId 와 같지 않은 것으로 새로운 배열 생성

        // setTodos(deleteTodo)

        deleteTodo(todo.id)

        /*
            deleteTodo 함수를 oneTodo.jsx 에서 만들어주면 todos, setTodos 상태변수를 속성으로 두차례 (todo.jsx --> todoList.jsx --> oneTodo.jsx)
            옮겨주면 좀 그렇기 때문에 (안되는 건 아님, 그냥 좀 거추장스러움), todoList.jsx 에서 todos, setTodos 속성으로 받아주고, 함수로 만들어서 oneTodo.jsx 로 전달해주자
        */
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------

    // 수정 (갱신, Update) 요직 만들어보자
    const [isEditMode, setIsEditMode] = useState(false) //-->  화면이 바뀌기에 상태를 만들어준 것이다
    //-->  각각의 <OneTodo/> 마다 상태를 생성해준 것이다

    const contentRef = useRef()

    const onPressChangeEditMode = () => {
        //--> 수정 모드가 아닐 때, 수정 모드로 변경되는 함수이다
        //--> content 를 input 으로 대체하는 방법으로 진행할 거다  -->  수정 버튼을 누르면 수정 모드로 변하고, 버튼이 완료 버튼으로 바뀔 것이다
        //--> 그리고 완료 버튼을 누르면 이 onPressEdit 함수가 실행되고, 다시 수정 버튼으로 돌아올 것이다

        setIsEditMode(true) //--> 수정모드 키는 것 (기본값이 false 인데, true 로 바꿔줘서 버튼의 텍스트를 "수정" 에서 "완료" 로 바꿔준다  -->  수정모드가 켜진 것이다)
    }
    const onPressEdit = () => {
        //--> 완료 버튼을 누르면 실행되는 함수이다
        setIsEditMode(false) //--> 수정모드 끄는 것

        /*
            수정할 때 필요한 것 :
            selectTodo = {...selectTodo, content: content.current.value}  -->  selectTodo 의 요소를 바꾸면, 이 배열 요소가 바뀌는 것이다
            temp_todos.find((todo) => todo.id === todoId)  -->  복사본에서 내가 수정하고 싶은 요소를 찾는 것이다
            const temp_todos = [...todos]
            setTodos(temp_todos)

            필요한 input 값은 무엇인가?  -->  setTodos, todos, todoId, content
            setTodos, todos 는 어디에 있을까?  -->  todoList.jsx (delete 때 내가 전달했다는 것을 알고 있어야 한다)
        */

        // updateTodo(todo.id, contentRef.current.value)
        updateTodo({
            todoId: todo.id,
            content: contentRef.current.value
        })
        //--> 변수가 두개 이상 될때는, 객체 형태로 전달하는 것이 보기 편하다
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
                        {/*완료버튼 or 수정버튼 이냐에 따라 실행되는 함수를 다르게 만들어준 것이다*/}
                        {isEditMode ? "완료" : "수정"} {/*isEditMode 가 true 이면 수정 모드이기 때문에 버튼을 "완료" 로 바꿔줘야 한다*/}
                    </button>
                    <button onClick={onPressDeleteTodo}>삭제</button>
                </div>
            </S.Header>
            {isEditMode ? <textarea ref={contentRef} defaultValue={todo.content}></textarea> : <S.Content state={todo.state}>{todo.content}</S.Content>}
            {/* <S.Content state={todo.state}>{todo.content}</S.Content> */}
            {/*수정 버튼을 눌러서 textarea 창이 열려도 기존의 적혀있던 content 가 적혀있어야 하기에 {todo.content} 를 <textarea/> 태그의 기본값으로 넣어준 것
            --> defaultValue 속성의 값으로 기본값을 넣어주면 된다  -->  그냥 value 로 넣어주면 입력값 안바뀌고 고정되어버린다*/}
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
