import styled from 'styled-components'
import { flexAlignCenter, flexCenter } from '../../libs/styles/common';
import TDButton from '../../components/Button';
import AddTodoModal from './_components/addTodoModal';
import TodoList from './_components/todoList';

function Todo() {

    // isOpenAddTodoModal 변수가 하는 역할은 무엇인가? --> true 또는 false 로 모달창을 띄우고 안띄우고의 역할을 한다

    let isOpenAddTodoModal = false
    // let isOpenAddTodoModal = true

    //--> true 이면 <AddTodoModal/> 이 보이는 것이고, false 이면 보이지 않는 역할을 한다
    //--> isOpenAddTodoModal 이 "true" 일 때만 모달창을 보여주기 위함이다  -->  "추가" 버튼을 눌러주면 isOpenAddTodoModal 의 값을 true 로 바꾸는 요직을 짜야한다

    // todos 는 todo data 로 이루어진 배열
    // todos 는 TodoList 컴포넌트가 아니라 상위인 Todo 컴포넌트에 있어야하는 이유

    // props 전달은 "상위" 에서 "하위" 만 가능하다
    // todos 는 todo 목록을 보여주는 <TodoList/> 컴포넌트에도 필요하지만 todo 를 추가하는 <AddTodoModal/> 에도 필요하기 때문에
    // 부모인 Todo 컴포넌트가 하위 컴포넌트들에게 props 로 전달하기 위해 알아야하는 값이다 (Todo 컴포넌트가 가지고 있어야하는 값이다)

    // 하지만, 이것이 관연 옳을까?  -->  하위 컴포넌트에게 전달을 하기 위해 상위 컴포넌트가 자기한테는 불필요한 값을 알아야 한다고?
    // 이때 전역변수화 시킬 수 있다면 props 전달이 필요없다
    //-->  todo (상태이다)  -->  전역으로 만드는 것이 불가능하다  -->  그래서 나온 것이 "전역상태" 이다

    // "전역상태" 를 사용하는 이유 중에 하나가 상위 컴포넌트가 몰라도 되는 값을 알고 있어야 할 때
    //==> 아직은 "상태" 도 배우지 않았기 때문에 그냥 상위 컴포넌트에 todos 를 만들어준 것이다

    const todos = [
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
    ] 
    //-->  todos 배열이 이렇게 상위 컴포넌트 <Todo/> 에 있는 이유는 <AddTodoModal/> 도 todos 를 알아야 하고, <TodoList/> 도 todos 를 알아야하기 때문이다
    //-->  나중에 상태속성 배우면 "전역상태" 사용하면 이렇게 안 해도 된다

    return <>
        {isOpenAddTodoModal && <AddTodoModal todos={todos}/>} {/*-->  모달창이기에, 컴포넌트 맨 상단에 배치해놓은 것*/}
        {/* isOpenAddTodoModal 이 true 이면 <AddTodoModal/> 컴포넌트가 나오는 요직 */}
        <S.Wrapper>
            <S.Container>
                <S.Title>TODOLIST</S.Title>
                <TodoList todos={todos}/>
                <TDButton size={'full'} variant={'primary'}>
                추가
                </TDButton>
            </S.Container>
        </S.Wrapper>
  </>
}

export default Todo

const Wrapper = styled.div`
    height: 100vh;
    ${flexCenter}; //--> x , y 축 가운데 정렬
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
    // 구조분해할당 안함 :
    background-color: ${(props) => props.theme.colors.primary}; //-->  디자인 토큰 (디자인을 변수화 해놓은 컬러, 폰트사이즈, 라인웨이트 같은 것들)
    
    // 구조분해할당 함 :
    color: ${({ theme }) => theme.colors.text.white}; //-->  디자인 토큰 (구조분해할당 시킨 것)
    /*
        themeProvider 로 전달된 theme 객체는 콜백함수의 theme 이라는 key 로 전달이 된다  -->  theme.colors.primary  -->  primary: "#00C7AE"

        --> App.js 에서 ThemeProvider 에 속성의 키값 "theme" 에 디자인 토큰이 있는 객체를 전달했기 때문에 theme 으로 쓰는 것이다
        --> 이렇게 매번 import 하지 않아도 <ThemeProvider/> 로 전체적인 "router" 를 감싸줬기에, 자동으로 전달이 되니까 그냥 사용하면 된다
    */

    padding-left: 32px;
    height: 32px;
    ${flexAlignCenter};
    //-->  y 축 가운데 정렬
`;

const S = {
    Wrapper,
    Container,
    Title
}