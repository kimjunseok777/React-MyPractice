import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../libs/styles/common";
import TDButton from "../../../components/Button";
import { useTodo } from "../../../store/todo.store";


const AddTodoModal = ({setIsOpenAddTodoModal}) => {
    
    const {todos, setTodos} = useTodo()

    const onPressAddTodo = (event) => {
        event.preventDefault()

        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            title: event.target.title.value,
            content: event.target.content.value,
            state: false
        }

        setTodos([...todos, newTodo])
        setIsOpenAddTodoModal(false)
    }

    return (
        <S.Modal>
            <S.Form onSubmit={onPressAddTodo}>
                <S.Title>
                    <h1>ADD TODO LIST</h1>
                    <button type='button' onClick={() => setIsOpenAddTodoModal(false)}> x </button>
                    {/*이 버튼은 submit이 되면 안되기에 type 을 button 이라고 명시해준 것이다*/}
                </S.Title>
                <S.Content>
                    <input name="title" placeholder="제목을 입력해주세요"/>
                    <textarea name="content" placeholder="할 일을 입력해주세요"/>
                </S.Content>
                <TDButton 
                    variant={'primary'}                
                    size={'full'}
                >
                    ADD
                </TDButton>
            </S.Form>
        </S.Modal>
    )
}
export default AddTodoModal


const Modal = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const Form = styled.form`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 32px;
`;

const Title = styled.div`
    font-size: 24px;
    ${flexAlignCenter};
    justify-content: space-between;
    & > button {
        border: none;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
  }
`;

const Content = styled.div`
    ${flexCenter};
    margin-top: 16px;
    margin-bottom: 16px;
    flex-direction: column;

    & > input {
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        border-radius: 8px;
        padding: 0 16px;
        margin-bottom: 16px;
    }

    & > textarea {
        width: 100%;
        height: 200px;
        border: none;
        outline: none;
        border-radius: 8px;
        padding: 16px;
    }
`;

const S = {
    Modal,
    Form,
    Content,
    Title,
};
