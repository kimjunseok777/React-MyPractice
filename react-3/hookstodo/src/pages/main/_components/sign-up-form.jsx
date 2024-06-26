// import styled from "styled-components"
import { Form } from "./style"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"

const SIGNFORM_ARRAY = [
    {
        label: "이메일",
        size: 3,
        name: "email",
        option: {
            placeholder: "이메일을 입력해주세요"
        }
    },
    {
        label: "비밀번호",
        size: 3,
        name: "password"
    },
    {
        label: "비밀번호 확인",
        size: 3,
        name: "password-confirm"
    },
]

// const SignUpForm = ({formState}) => {
const SignUpForm = ({setFormState}) => {

    const onSubmitSignUp = (event) => {
        const email = event.target.email.value
        event.preventDefault()
        alert(`${email}님 환영합니다`)

        // formState = "SIGN-IN"  //-->  여기에 setFormState("SIGN-IN") 이 들어가야 한다
        // 하지만 sign-up-form 에는 setFormState 가 없다  -->  상위 컴포넌트에 있으니 main 으로 가서 props 로 전달해주자
        setFormState("SIGN-IN")
        //-->  이제 onSubmit 이벤트가 실행되면 상태 변수인 formState가 바뀌면서 로그인 페이지로 이동하게 되는 것이다
        //-->  이렇게 여기서 setFormState 상태 함수 사용하면, main.jsx 에서 적용되는 것이다
    }

    return <S.Form onSubmit={onSubmitSignUp}>
        {
            SIGNFORM_ARRAY.map((form) =>
            <FormInput
                name={form.name}
                key={form.name} label={form.label} size={form.size} placeholder={form.option ? form.option.placeholder : form.name}
            />)
        }
        <TDButton variant={'primary'} size={'full'} shape={'shape'}>회원가입</TDButton>
    </S.Form>
}

export default SignUpForm

const S = {
    Form
}