import styled, { css } from "styled-components"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import { Form } from "./style"
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {

    const navigate = useNavigate()

    const handlePressSignIn = (event) => {
        event.preventDefault()

        const {email, password} = event.target

        if(!email.value.trim() || !password.value.trim()) return
        if(email.value === "test" && password.value === "test") {
            return navigate("/todo/3")  //-->  로그인에서 투두로 이동할 때는 formState 상태변수를 이용하는 것이 아닌, useNavigate 로 이동한다
        }
        alert("아디이와 비밀번호를 확인해주세요")
    }

    return <S.Form onSubmit={handlePressSignIn}>
        <FormInput label={"이메일"} placeholder={"email"} size={3} name={'email'}/>
        <FormInput label={"비밀번호"} placeholder={"password"} size={3} name={'password'} containerStyle={css`
            width: 100px;
        `}/>
        <TDButton variant={'primary'} size={'full'} shape={'shape'}>로그인</TDButton>
    </S.Form>
}

export default SignInForm

// 삭제해줘도 되는 것들  -->  다 컴포넌트로 모듈화 해줬다
const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 16px;
    width: 100%;
`
const Input = styled.input`
    border: 1px solid #999;
    width: 100%;
    border-radius: 4px;
    padding-left: 16px;
    height: 48px;
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

const S ={
    Form,
    InputBox,
    Input,
    InputLabel
}