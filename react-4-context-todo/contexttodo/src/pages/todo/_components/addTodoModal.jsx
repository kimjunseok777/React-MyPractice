import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../libs/styles/common";
import TDButton from "../../../components/Button";


const AddTodoModal = ({setIsOpenAddTodoModal, todos, setTodos}) => {

    // onSubmit 이벤트에 들어갈 함수 작성
    const onPressAddTodo = (event) => {
        event.preventDefault()  //-->  이것은 form 이벤트에서는 반드시 작성해주는 것이 좋다  -->  안그러면 ? 가 생기면서 주소를 이동시켜버린다
        /*
            추가 요직을 만들때 최종적으로 필요한 코드가 무엇인지 생각해보자
            -->  setTodos
            -->  setTodos([...todos, newTodo])

            * setTodos  -->  todo.jsx 에 있다  -->  props 로 전달 받아야한다
            * todos  -->  todo.jsx 에 있다  -->  props 로 전달 받아야한다
            * newTodo  -->  이것만 여기서 만들어 주면 된다
                                  -->  "입력값" 을 받아오기 위해 input 태그와 textarea 태그에 name 속성을 만들어주자
        */
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            title: event.target.title.value,
            content: event.target.content.value, //-->  form 태그에 onSubmit 이벤트를 넣어줬고, 그 안에 있는 input 을 타겟팅해서 value를 가져오는 것이다
            state: false
        }

        setTodos([...todos, newTodo])  //-->  복사본 배열을 전개연산자인 ...todos 로 생성하고, 그 배열의 마지막 요소로 newTodo 를 넣어준 것이다
        // 이렇게 모두 작성했으면 추가 요직이 끝난 것이다
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
