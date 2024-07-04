import React from "react"
import styled, { css } from "styled-components"

const FormInput = ({label, size, containerStyle, error, register, name, ...props}) => {
    //-->  register 로 등록시켜주기 위해 name 속성도 만들어서 전달받아준 것이다  -->  이름 (email, password ... 등등 전달받아 등록하기 위함)
    //-->  rhf , yup 을 사용하기 위해 register , name 을 속성으로 전달받아줬다 (원래 name 은 나머지 매개변수를 통해 사용했었음)

    return <>
        <S.InputBox size={size}>
            <S.InputLabel>{label}</S.InputLabel>
            <S.Input size={size} name={name} {...props} {...register?.(name)}/> {/*--> register 가 있다면 name 이름으로 등록하는 것이다  -->  "재사용" 하기 위함*/}
            {/*--> register 전달 받은 것을 확인 가능하다  -->  name 속성으로 등록해준 것을 확인할 수 있다 ( email , password ) */}
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
    ${(props) => sizeCSS[props.size]}
`
const Input = styled.input`
    border: 1px solid #999;
    border-radius: 4px;
    padding-left: 16px;
    ${(props) => sizeCSS[props.size]}
    &::placeholder{
        text-align: center;
    }
`
const InputLabel = styled.label`
    position: absolute;
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