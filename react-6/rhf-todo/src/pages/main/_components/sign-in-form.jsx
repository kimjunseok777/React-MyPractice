import styled, { css } from "styled-components"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import { Form } from "./style"
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

/*
    yup 을 사용했다  -->  yup 은 스키마를 생성하는 것이다  -->  스키마 : 제약조건 (유효성 검사와 같은 말이다)
    이러한 "제약조건" 을 만드는 것이 "yup" 의 역할이다

    yup : 제약조건 (유효성 검사) 를 쉽게 만들기 위한 라이브러리이다
*/

const signInFormSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다').required(" "), //-->  required 를 하게 되면 값이 없어도 에러가 생긴다는 조건을 만들어준 것이다
    // 이렇게 "yup.string().email" 해주면 얘가 자동으로 검사해주고, 에러메세지도 만들어주는 것이다
    //-->  "@" 가 들어가야된다는 정규표현식 같은 거 쓰지 않아도 되는 것이다

    password: yup.string().min(8, '비밀번호는 8글자 이상 입력해주세요').required(" ")
    // 비밀번호도 마찬가지로 string 인지 확인하고, min 으로 8글자 이상인지 확인하는 것이다  -->  이렇게 "yup" 을 사용하면 제약조건을 쉽게 작성해줄 수 있다
})

/*
    이렇게 yup 으로 스키마(제약조건) 을 생성해줬으면, yupResolver 에 등록해주면 된다
    -->  npm i @hookform/resolvers/yup 로 설치하고, { yupResolver } import 받은 후에 resolver 에서 사용해주면 된다

    ==>  ** 주의할점 : register 된 이름과, 스키마에서 만들어준 key 값의 이름이 같아야한다
*/


const SignInForm = () => {

    const navigate = useNavigate()

    const {
        register,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(signInFormSchema),  //-->  위에서 yup 으로 만들어준 스키마를 등록해준 것이다
    })

    
    /*
        이렇게 "submit" 하는 방법이 다르다  -->  handleSubmit 이라는 친구를 onSubmit 안에 감싸주는 형태로 만들어야한다
        -->  제출이벤트로 실행시킬 함수를 handleSubmit 안에 넣어줘서 실행시켜야 한다  -->  실행시킨 함수의 매개변수로는 "data" 가 온다

        "yup" 은 제약조건을 쉽게 만들기 위해 사용하는 것이고, 이외의 사용방법은 RHF 와 같다
        유효성 검사를 쉽게하고, 원하는 시점에 랜더링 하기 위해서 (원하는 시점에만 유효성 검사를 보여주기 위해서)
    */


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