import styled from 'styled-components'
import { flexAlignCenter, flexCenter } from '../../libs/styles/common';
import TDButton from '../../components/Button';
import AddTodoModal from './_components/addTodoModal';
import TodoList from './_components/todoList';
import { useState } from 'react';

function Todo() {

    // let isOpenAddTodoModal = false
    const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false)
    //-->  상태로 바꿔줬으면, 추가 버튼에 클릭 이벤트도 넣어주자

    // const todos = [
    //     {
    //         id: 1,
    //         title: "example-1",
    //         content: "example-1",
    //         state: true
    //     },
    //     {
    //         id: 2,
    //         title: "example-2",
    //         content: "example-2",
    //         state: false
    //     },
    // ] 

    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "example-1",
            content: "example-1",
            state: true
        },
        {
            id: 2,
            title: "example-2",
            content: "example-2",
            state: false
        },
    ])

    return <>
        {isOpenAddTodoModal && <AddTodoModal
        todos={todos}
        setTodos={setTodos}
        setIsOpenAddTodoModal={setIsOpenAddTodoModal}
        />}
        <S.Wrapper>
            <S.Container>
                <S.Title>TODOLIST</S.Title>
                <TodoList todos={todos} setTodos={setTodos}/>
                {/* <TDButton size={'full'} variant={'primary'}> */}
                <TDButton size={'full'} variant={'primary'} onClick={() => setIsOpenAddTodoModal(true)}>
                    {/* 여기서 TDButton 컴포넌트에 클릭 이벤트 넣으려면 나머지 매개변수 {...rest} 넣어줘야한다  -->  왜일까? */}
                    추가
                </TDButton>
            </S.Container>
        </S.Wrapper>
  </>
}

export default Todo

const Wrapper = styled.div`
    height: 100vh;
    ${flexCenter};
`;
const Container = styled.div`
    width: 420px;
    height: 100%;
    background-color: '#ffffff';
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    position: relative;
`;
const Title = styled.h1`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.white};
    padding-left: 32px;
    height: 32px;
    ${flexAlignCenter};
`;

const S = {
    Wrapper,
    Container,
    Title
}