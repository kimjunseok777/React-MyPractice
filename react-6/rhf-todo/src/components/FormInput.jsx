import React from "react"
import styled, { css } from "styled-components"

const FormInput = ({label, size, containerStyle, error, register, name, ...props}) => {
    //-->  register 로 등록시켜주기 위해 name 속성도 만들어서 전달받아준 것이다  -->  이름 (email, password ... 등등 전달받아 등록하기 위함)

    return <>
        <S.InputBox size={size}>
            <S.InputLabel>{label}</S.InputLabel>
            <S.Input size={size} name={name} {...props} {...register?.(name)}/> {/*--> register 가 있다면 name 이름으로 등록하는 것이다*/}
            {/*--> register 전달 받은 것을 확인 가능하다  -->  name 속성으로 등록해준 것을 확인할 수 있다*/}
        </S.InputBox>
                <p style={{
                        visibility: error ? "visible" : "hidden",
                        color: "red",
                        padding: 0,
                        fontSize: 10
                    }}>{error}
                </p>
    </>
}

export default FormInput

const sizeCSS = {
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
    /* margin-bottom: 16px; */
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