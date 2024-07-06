import styled from "styled-components"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import { Form } from "./style"
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"


const signInFormSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다').required(" "),
    password: yup.string().min(8, '비밀번호는 8글자 이상 입력해주세요').required(" ")
})


const SignInForm = () => {

    const navigate = useNavigate()

    const {
        register,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(signInFormSchema),
    })

    const handlePressSignIn = (data) => {
        if(data.email === "test@test.com" && data.password === "testtest") {
            return navigate("/todo/3")
        }
        alert("아디이와 비밀번호를 확인해주세요")
    }


    return <S.Form onSubmit={handleSubmit(handlePressSignIn)}>
        <FormInput label={"이메일"} placeholder={"email"} size={3} name={'email'} register={register}
            error={errors.email?.message}
        />

        <FormInput label={"비밀번호"} placeholder={"password"} size={3} name={'password'} register={register}
            error={errors.password?.message}
        />

        <TDButton variant={'primary'} size={'full'} shape={'shape'} disabled={!isValid}>
            로그인
        </TDButton>
        
    </S.Form>
}

export default SignInForm


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