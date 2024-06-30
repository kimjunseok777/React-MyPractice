// import styled from "styled-components"
import { Form } from "./style"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"



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

// import * as yup from "yup"
//--------------------------------------------------------------------------------------------------------------
const signFormSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다').required(),
    password: yup.string().min(8, '비밀번호는 8글자 이상 입력해주세요').required(),
    'password-confirm': yup.string().oneOf([yup.ref("password")], "비밀번호 확인이 일치하지 않습니다").required()
})
//--------------------------------------------------------------------------------------------------------------

const SignUpForm = ({setFormState}) => {

    //----------------------------------------------
    const {
        register,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(signFormSchema),
    })
    //----------------------------------------------

    const onSubmitSignUp = (data) => {
        alert(`${data.email}님 환영합니다`)
        setFormState("SIGN-IN")
    }

    console.log(errors)


    return <S.Form onSubmit={handleSubmit(onSubmitSignUp)}>
        {
            SIGNFORM_ARRAY.map((form) =>
            <FormInput
                name={form.name}
                key={form.name} label={form.label} size={form.size} placeholder={form.option ? form.option.placeholder : form.name}
                // onChange={onChangeInputs}

                //---------------------------------------------
                error={errors[form.name]?.message}
                // {...register(form.name)}
                register={register}
                //---------------------------------------------
            />)
        }
        <TDButton variant={'primary'} size={'full'} shape={'shape'} disabled={!isValid}>회원가입</TDButton>
    </S.Form>
}

export default SignUpForm

const S = {
    Form
}