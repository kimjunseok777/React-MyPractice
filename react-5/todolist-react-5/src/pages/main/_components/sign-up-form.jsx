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


const SignUpForm = ({setFormState}) => {

    const onSubmitSignUp = (event) => {
        const email = event.target.email.value
        event.preventDefault()
        alert(`${email}님 환영합니다`)

        setFormState("SIGN-IN")
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