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
// yup 의 스키마를 작성해준 것이다 (제약조건을 만들어 준 것이다)  -->  이 스키마를 useForm 의 "yupResolver" 에 등록해주면 된다
//-->  npm i @hookform/resolvers/yup  -->  설치해줘야 한다
//--------------------------------------------------------------------------------------------------------------
const signFormSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다').required(""),
    password: yup.string().min(8, '비밀번호는 8글자 이상 입력해주세요').required(""),
    'password-confirm': yup.string().oneOf([yup.ref("password")], "비밀번호 확인이 일치하지 않습니다").required("")
    //-->  oneOf : 뒤에 있는 배열에 맞는 값을 true 로 반환한다  -->  앞에 지정해준 비밀번호와 값이 똑같은지 검사할 때 자주 사용한다
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
                error={errors[form.name]?.message} //--> map 이기에 순회해서 [form.name] 이름으로된 에러가 있다면 메세지를 보여주는 것이다
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