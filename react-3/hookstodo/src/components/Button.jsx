/*
컴포넌트 버튼은 variant, size, shape 값을 전달 받습니다

1. variant -> primary, secondary, primary-text
2. size -> small, medium, full
3. shape -> shape, round

1. variant :
    - primary -> 배경 녹색, 글자 흰색
    - secondary -> 배경 파랑색, 글자 흰색
    - primary-text -> 글자만 녹색, 배경x

2. size :
    - small -> padding: 16px
    - medium -> padding: 16px 32px
    - full -> width: 100%, aspect-ratio : 8 / 1

3. shape :
    - shape -> radios 8px
    - round -> 50%

나머지 매개변수 사용할 것
<button>텍스트</button> -> ({children})

ex) 
    const TDButton = ({variant, size, shape, children , ...rest}) => {
        return (
            <S.Button
                variant={variant}
                ....
            >
                {children}
                // 해당 컴포넌트가 감싸고 있는 것은 children으로 자동전달
            </S.Button>
        )
    }

    <TDButton variant={'primary'} size={'full'} shape={'shape'}>
        회원가입
    </TDButton>
*/

//-------------------------------------------------------------------------------------------------------------------------------

import styled, { css } from "styled-components"

const TDButton = ({variant, size, shape, children, ...rest}) => {
    return (
        <S.Button
            {...{variant, size, shape}}
            {...rest}
        >
            {/* variant={variant}  size={size}  shape={shape}  -->  위 속성은 이거와 같은 말이다*/}
            {/*{...{variant, size, shape}}  -->  코드블럭 안에 "전개연산자(...)" 와 객체코드블럭을 넣어준 것이다  -->  "전개연산자" 는 나중에 배운다*/}
            {/*{variant, size, shape} 이 객체 안에 있는 내용들을 풀어서 S.Button 에 전개한다는 의미이다*/}
            {children}
        </S.Button>
    )
}
export default TDButton

// variant 에 따라 css가 변경  -->  variantCSS
// size 에 따라 css가 변경  -->  sizeCSS
// shape 에 따라 css가 변경  -->  shapeCSS

//-->  객체를 만들어주고, 그 객체의 value값 (반환값) 들을 css 문법으로 작성해준 것이다
//-->  즉, 객체 접근법 (닷 접근법 / 대괄호 접근법) 을 사용하면 css 문법을 반환 받을 수 있는 것이다

const variantCSS = {
    primary: css`
        background-color: #288628;
        color: #fff;
    `,
    secondary: css`
        background-color: #3636e3;
        color: #fff;
    `,
    'primary-text': css`
        background-color: transparent;  //-->  배경색 투명색으로 준 것이다
        outline: none;  //-->  선 없애주는 것
        color: #0a540a;
    `
}
const sizeCSS = {
    small: css`
        padding: 16px;
    `,
    medium: css`
        padding: 16px 32px;
    `,
    full: css`
        width: 100%;
        aspect-ratio: 8/1;  //-->  종횡비 유지이다  -->  가로 8 : 세로 1  (보통은 이미지에 많이 쓰이는 css 이다)
    `
}
const shapeCSS = {
    shape: css`
        border-radius: 4px;
    `,
    round: css`
        border-radius: 50%;
    `
}

// props 로 variant, size, shape 값들을 받아서 객체 안에 들어있는 css 속성을 정해주는 것이다
const Button = styled.button`
    ${(props) => variantCSS[props.variant]}
    ${({size}) => sizeCSS[size]}  //-->  구조분해할당
    ${(props) => shapeCSS[props.shape]}
`

const S = {
    Button
}


