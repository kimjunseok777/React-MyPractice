import React from "react"
import styled, { css } from "styled-components"


const FormInput = ({label, size, containerStyle, error, ...props}) => {
    return <>
    <S.InputBox size={size}>
        <S.InputLabel>{label}</S.InputLabel>
        <S.Input size={size} {...props}/>
    </S.InputBox>

    <p style={{
        visibility: error ? "visible" : "hidden",
        color: "red",
        padding: 0,
        fontSize: 10,
    }}>
        {error}
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
    //-->  컴포넌트에 마진을 주면, 마진이 다른 재사용하는 곳에서 재사용이 어렵다  -->  마진 이렇게 컴포넌트에 직접적으로 주면 안된다
    //-->  어떤 wrapper 같은 거로 감싸줘서 간격을 주거나, 사이에 어떤 요소를 끼워넣어서 간격을 줘야된다
    //==>  컴포넌트에 마진 주면 안된다
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