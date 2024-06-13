import styled from "styled-components";
import { flexAlignCenter } from "../../../libs/styles/common";

const OneTodo = ({todo}) => {
    
    //--> todos 배열을 맵돌린 것을 todo 로 속성으로 받았기에 이제 .title , .state , .content  ...  등등 으로 사용할 수 있는 것이다

    return (
        <S.Wrapper state={todo.state}> {/* true 와 false 전달 */}
            <S.Header>
                <div>
                    {todo.state ? "완료" : "미완료"} {/*state 가 true 이면 타이틀 앞에 "완료" 가 뜬다*/}
                    {todo.title} {/* example-1 , example-2 */}
                </div>
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </S.Header>
            <S.Content state={todo.state}> {/* true 와 false 전달 */}
                {todo.content} {/* example-1 , example-2 */}
            </S.Content>
        </S.Wrapper>
        )
}
export default OneTodo


const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid #999;
    margin: 16px 0;  //-->  위 아래 여백 16px (밀어내기)
    border-radius: 8px;
    background-color: ${({ state, theme }) =>
        state ? theme.colors.Gray[1] : theme.colors.text.white};
        //-->  state 가 true 이면 배경 컬러가 회색으로 변한다 , false 이면 하얀색
`;

const Header = styled.div`
    border-bottom: 1px dotted #999;
    ${flexAlignCenter};  //-->  y 축 가운데 정렬
    justify-content: space-between;
    padding: 8px 16px;
    height: 48px;
`;

const Content = styled.div`
    padding: 16px;
    text-decoration: ${({ state }) => (state ? "line-through" : "none")};
    //-->  state 가 true 이면 텍스트에 라인이 그어진다
`;

const S = {
    Wrapper,
    Header,
    Content,
};
