import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../libs/styles/common";
import TDButton from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../../store/todo.slice";
import { useEffect } from "react";


const AddTodoModal = ({setIsOpenAddTodoModal}) => {
    
    const dispatch = useDispatch()

    //------------------------------------------------------------------------------------------------
    // redux thunk :
    // 로딩, 성공, 실패 등등 확인하기 위해 useSelector 로 가져와준 것
    const state = useSelector((store) => store.todo.addTodoState)
    console.log(state) //-->  로딩, 성공, 실패 등등 확인할 수 있다
    /*
        state : {
            loading: false,
            done: false,
            error: null
        }
    */
    //------------------------------------------------------------------------------------------------
    // msw 수업 :
    /**
     * @description : 이 함수는 투두를 추가하는 함수입니다
     * @param {*} event 
     * event : FormEvent 입니다
     */
    const onPressAddTodo = async (event) => {
        event.preventDefault()

        //-----------------------------------------------------
        // redux thunk :
        dispatch(
            addTodo({
                title: event.target.title.value,
                content: event.target.content.value,
            })
        )
        // 이 dispatch 한 것이 todo.slice 로 이동하고, 이 값을 todo.slice 에서 fetch 로 req 보내고, res 받은 값을 json() 등으로 바꿔서 return 시켜준 것이다
        //-->  즉, response.body 이 값이 action.payload 로 담기는 것이다

        //---------------------------------------------------------------------------------------------------------------------------
        /*
        // redux thunk 사용하면 필요없기에 주석처리 해준 것 :
        // 작성 :

            const result = await fetch("/api/todo", {
                method: "post",
                body: JSON.stringify({
                    title: event.target.title.value,
                    content: event.target.content.value,
                })
            })
            const response = await result.json()
            console.log(response) //--> 또 그냥 response 가 아니라 response.data 일 수도 있기에 콘솔로그 찍어서 확인해준 것
            dispatch(addTodo(response.data))

        //--> "/api/todo" 의 post 에서 키가 data 인 객체 안에 보냈기에, data 로 한번 더 접근해줘야 되는 것이다  -->  todo.api.js 확인해보자
        //==>  logger 안에도 데이터가 잘 전달됐는지 확인해보면 좋다
        */
       //---------------------------------------------------------------------------------------------------------------------------


        // setIsOpenAddTodoModal(false) //==>  이것도 여기 있을 필요가 없다  -->  아래 useEffect 로 바꿔주자
        //-->  에러 또는 실행이 끝났을 때에 따라 바뀌게 만들어줄 것이다
    }

    // 로딩, 성공, 실패에 따라 모달창이 열고 닫히거나, 알람창이 뜨게끔 만들어준 것 (더 확실하게 action 을 구분시켜준 것이다)
    useEffect(() => {
        //--> 여기서 state 는 상단에 useSelector 로 불러온 전역상태값이다 (initialState 의 addTodoState 이다)
        //-->  const state = useSelector((store) => store.todo.addTodoState)
        if(state.error) {
            // error 의 값이 null 이 아니라 값이 있다면 실행  -->  즉, 에러메세지가 있으면 실행하는 것이다
            return alert(state.error.message) //-->  만약 에러가 있다면, 이런식으로 하면 된다
        }
        if(state.done) {
            //-->  요청이 정말 끝났다면 addTodo 모달창을 닫는 것이다 (더 확실하게 하기 위해 useEffect 로 만들어준 것)
            //-->  추가가 완벽히 이루어졌을 때 모달창을 닫을 수 있게끔 바꿔준 것
            setIsOpenAddTodoModal(false)
        }
    }, [setIsOpenAddTodoModal, state])  //-->  initialState 의 addTodoState 의 값이 바뀌면 재실행한다
    

    //------------------------------------------------------------------------------------------------

    // if(state.loading) return <div> Loading... </div>
    //-->  로딩중인 것을 아예 이런 식으로 만들 수도 있다

    return (
        <S.Modal>
            <S.Form onSubmit={onPressAddTodo}>
                <S.Title>
                    <h1>ADD TODO LIST</h1>
                    <button type='button' onClick={() => setIsOpenAddTodoModal(false)}> x </button>
                </S.Title>
                <S.Content>
                    <input name="title" placeholder="제목을 입력해주세요"/>
                    <textarea name="content" placeholder="할 일을 입력해주세요"/>
                </S.Content>
                <TDButton 
                    variant={'primary'}                
                    size={'full'}
                    disabled={state.loading}//--> 로딩이 true 일 때는 버튼 눌러지면 안되기에 설정해준 것
                >
                    {state.loading ? "Loading..." : "ADD"}
                </TDButton>
                {state.error && state.error.message}
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
