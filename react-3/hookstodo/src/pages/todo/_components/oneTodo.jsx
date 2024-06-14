import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";

const OneTodo = ({todo}) => {

    // Delete(삭제) 요직 만들어보자
    // 여기다 setTodos 를 직접 옮겨도 되고, deleteTodo 라고하는 함수를 만들어서 전달 받아도 괜찮다

    // ex)  const deleteTodo = (todoId) => setTodos(...)  -->  이 deleteTodo 라는 함수를 전달 받아도 괜찮고, setTodos 를 전달 받아도 괜찮다
    // 두가지 방법 다 props 로 전달받을 필요가 있다

    return (
        <S.Wrapper state={todo.state}>
            <S.Header>
                <div>
                    {todo.state ? "완료" : "미완료"}
                    {todo.title}
                </div>
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </S.Header>
            <S.Content state={todo.state}>
                {todo.content}
            </S.Content>
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
