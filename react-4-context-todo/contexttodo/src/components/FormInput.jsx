import React from "react"
import styled, { css } from "styled-components"

//-->  컴포넌트 매개변수 : 원래 obj 가 들어가있는데, 그 obj 의 key값인 "label" , "size" 를 빼오겠다는 의미  -->  그냥 obj 만 적혀있으면, 이 안에 뭐가 들어있는지 알 수가 없다
                                // {label: "이메일" , size: 3}  -->  이런 식이다 (구조분해할당은 그냥 축약형이다)
const FormInput = ({label, size, containerStyle, ...props}) => {
                                                        //-->  이러면 label, size 제외한 나머지 매개변수들이 "props" 로 오게 된다 ( ...props )

    return <S.InputBox size={size}>{/*container 의 스타일도 props로 받기 때문에 내 마음대로 컨트롤 할 수 있다*/}
                                                                                {/*바깥에 있는 컨테이너의 크기도 직접 수정하고 싶어서 만들어준 속성  -->  containerStyle*/}
        <S.InputLabel>{label}</S.InputLabel>
        <S.Input size={size} {...props}/>
        {/*나머지 매개변수 전달을 통한 input 의 속성 값 전달  --> ex) placeholder 같은 것들  -->  SignInForm 컴포넌트에서 placeholder 속성을 넣어줬다*/}
    </S.InputBox>
}

export default FormInput

const sizeCSS = {  //-->  "css" 는 자동완성 시켜줘서 "styled-components" 에서 import 해줘야 사용할 수 있다
    1: css`
        width: 100px;
        height: 48px;
    `,
    2: css`
        width: 300px;
        height: 48px;
    `,
    3: css`
        width: 100%;
        height: 48px;
    `
}

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 16px;
    /* width: 100%; */
    ${(props) => sizeCSS[props.size]} //-->  대괄호 접근법으로, 객체의 "key" 를 통해 "value" 에 접근한 것이다
`
const Input = styled.input`
    border: 1px solid #999;
    border-radius: 4px;
    padding-left: 16px;

    ${(props) => sizeCSS[props.size]} //-->  css문법이 와야하기 때문에, 객체의 반환값으로 css 문법을 적어준 것이다
    //-->  객체의 키를 통해서 값을 찾아오기 위해 "대괄호 접근법" 을 사용한 것이다
    
    &::placeholder{
        text-align: center;//--> 자기 자신 선택자 활용해서 placeholder 텍스트를 가운데로 옮겨준 것
    }
`
const InputLabel = styled.label`
    position: absolute;  //--> "포지션 앱솔루트" 이기에 Input 컴포넌트와 겹쳐서 사용할 수 있는 것이다 (포지션을 쓰면 요소를 이렇게 겹칠 수 있다)
    left: 16px;
    top: -6px;
    font-size: 12px;
    background-color: #fff;
    z-index: 100;
    padding: 0 4px;
`

const S = {
    InputBox,
    Input,
    InputLabel
}