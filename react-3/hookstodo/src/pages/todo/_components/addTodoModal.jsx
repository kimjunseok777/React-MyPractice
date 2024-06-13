import styled from "styled-components";
import { flexAlignCenter, flexCenter } from "../../../libs/styles/common";
import TDButton from "../../../components/Button";


const AddTodoModal = () => {
    return (
        <S.Modal>
            <S.Form>
                <S.Title>
                    <h1>ADD TODO LIST</h1>
                    <button type='button'> x </button>
                </S.Title>
                <S.Content>
                    <input placeholder="제목을 입력해주세요"/>
                    <textarea placeholder="할 일을 입력해주세요"/>
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
    /* ${flexCenter}  //-->  밑에 가운데 정렬해주는 코드 말고, 이 flexCenter 사용해도 Form 컴포넌트를 가운데 정렬 시킬 수 있음 */
`;

const Form = styled.form`
    width: 480px;
    position: absolute;
    //---------------------------------------------------------------
    //-->  이 가운데 정렬 코드는, 부모인 Modal 컴포넌트에 flexCenter 공용 CSS 주는 걸로도 대체할 수 있음
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //---------------------------------------------------------------
    /* background-color: ${({ theme }) => theme.colors.white}; */
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 32px;
`;

const Title = styled.div`
    font-size: 24px;
    ${flexAlignCenter}; //--> y 축 가운데 정렬
    justify-content: space-between; //--> x 축 양끝 정렬

    //-->  Title 컴폰넌트 안에 자식으로 button 태그가 들어가있다
    & > button {  //-->  자기 자신의 자식 button 을 가리킨다
        border: none;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
        }
  }
`;

const Content = styled.div`
    ${flexCenter}; //--> x , y 축 가운데 정렬
    margin-top: 16px;
    margin-bottom: 16px;
    flex-direction: column;  //-->  자식 수직으로 생성
    //--> 자신의 자식인 input 태그를 가리킨다
    & > input {
        width: 100%;
        height: 40px;
        /* border: none; */
        outline: none;
        border-radius: 8px;
        padding: 0 16px;
        margin-bottom: 16px;
    }
    //--> 자신의 자식인 textarea 태그를 가리킨다
    & > textarea {
        width: 100%;
        height: 200px;
        /* border: none; */
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
