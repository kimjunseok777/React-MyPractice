import styled, { css } from "styled-components"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import { Form } from "./style"
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import useInput from "../../../hooks/use-input"

const SignInForm = () => {

    const navigate = useNavigate()

    // const [email, setEmail] = useState()
    //-->  입력값을 상태로 만들기 위해 선언해준 것 (유효성 검사를 위함)  -->  커스텀 훅으로 사용하기 위해 주석처리해준 것

    // const [password, setPassword] = useState()
    //-->  비밀번호도 입력값 상태로 받아오려면 이거랑 실행할 함수를 또 만들어줘야된다  -->  커스텀훅을 사용하면 해결가능하다

    const [email, handleChangeEmailValue] = useInput("")  //  [ value , onChange ]  -->  return 되는 값을 배열 구조분해할당 한 것이다
    const [password, handleChangePasswordValue] = useInput("")
    //--> 첫번째가 상태이고, 두번째가 앞의 상태를 set 해주는 함수이다  -->  set(event.target.value)
    /*
        다른 입력창이 있다고 하더라도 이제 함수나 상태를 반복 선언할 필요가 없어지는 것이다
        -->  const[a, handleA] = useInput()  -->  이렇게만 해주면 상태랑 함수 동시에 선언되는 것이다 (여러개 만들 필요가 없어진다)
    */

    /*
        const handleChangeEmailValue = (event) => {  -->  커스텀훅 (useInput) 사용하면 이 함수를 매번 만들어줄 필요가 없어진다
            setEmail(event.target.value)
        }
    */

    const isValidEmail = email.includes("@")  //-->  email 입력창에 @ 가 있어여 true 가 나온다
    const isValidPassword = password.length >= 8  //-->  password 입력창에 text 길이가 8 이상이면 true 가 나온다
    //-->  이 조건에 따라서 error 메세지를 보여줄 것이기 때문에, FormInput 의 속성으로 error 를 넣어주자
    //-->  ex) error={ !isValidEmail && "이메일 양식이 맞지 않습니다" }



    const handlePressSignIn = (event) => {
        event.preventDefault()

        const {email, password} = event.target

        if(!email.value.trim() || !password.value.trim()) return
        if(email.value === "test@test.com" && password.value === "testtest") {
            //-->  유효성 검사에 맞게 navigate 되는 if문의 조건을 바꿔줬다
            
            return navigate("/todo/3")
        }
        alert("아디이와 비밀번호를 확인해주세요")
    }


    return <S.Form onSubmit={handlePressSignIn}>

        {/*이 input 의 값이 바뀔 때마다 setEmail 실행으로 인해서 email 이란 상태의 값이 바뀌는 것이다*/}
        <FormInput label={"이메일"} placeholder={"email"} size={3} name={'email'} onChange={handleChangeEmailValue}
            error={!isValidEmail && email && "이메일 양식이 맞지 않습니다"}
            // isValidEmail 가 false 이고, email 이 값이 들어있다면 이 "문자열" 을 반환하는 것이다  -->  값이 아예 비어있을 때 문자열 나오는 것을 막기 위함
        />

        <FormInput label={"비밀번호"} placeholder={"password"} size={3} name={'password'} onChange={handleChangePasswordValue}
            error={!isValidPassword && password && "비밀번호는 8글자 이상이어야합니다"}
            // isValidPassword 가 false 이고, password 값이 들어있다면 이 "문자열" 을 반환하는 것이다
            // password 값이 길이 8글자 이하로 유효하지 않고, 값이 있다면 "비밀번호는 8글자 이상이어야합니다" 이 문자열을 보여주는 것
        />

        <TDButton variant={'primary'} size={'full'} shape={'shape'} disabled={!isValidEmail || !isValidPassword}>
            {/*
                disabled 가 true 이면 버튼이 클릭이 안된다  -->  true 가 되는 시점은 언제일까  -->  입력값이 유효하지 않을 때 버튼은 눌러지면 안된다
                -->  이메일, 비밀번호 둘중에 하나라도 값을 만족하지 않는 상태라면, disabled 는 true 로 버튼을 비활성화 해놔야한다
            */}
            {/*
                disabled 로도 true 또는 false 로 버튼 활성화 / 비활성화로 화면이 바뀐다
                -->  disabled 가 상태여야하지만, 이미 email 가 password 를 상태로 만들어 놨기에 상관 없는 것이다
            */}
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