import { css, keyframes } from "styled-components";

//--> 공용으로 들어갈 수 있는 css 속성들을 모듈화 하는 것이다
//--> 이렇게 직접 해도 되지만, 보통은 라이브러리를 사용하는 것이 좋다  -->  ex) AOS

export const flexCenter = css`
    //--> x , y 축 가운데 정렬
    display: flex;
    justify-content: center;
    align-items: center;
`
export const flexAlignCenter = css`
    //--> y 축 가운데 정렬
    display: flex;
    align-items: center;
`

//-------------------------------------------------------------------------------------------------------

//--> 애니메이션 같은 것들을 자주 모듈화해서 쓰는데, "keyframes" 로 작성해주면 된다 (투두리스트에서는 안쓰임, 그냥 작성해본 것이다)
export const fadeIn = keyframes`
    0% {
        opacity: 0;
        /* top: 50px; */
        transform: translateY(200px);
    }
    100% {
        opacity: 1;
        /* top: 0px; */
        transform: translateY(0);
    }
`
//-->  이렇게 하면 위에서 아래로 올라오는 듯한 효과를 낼 수 있다