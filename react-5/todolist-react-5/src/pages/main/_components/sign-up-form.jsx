// import styled from "styled-components"
import { Form } from "./style"
import FormInput from "../../../components/FormInput"
import TDButton from "../../../components/Button"
import useInputs from "../../../hooks/use-inputs"
import { validateSignForm } from "../_utils/validate-helper"


const SIGNFORM_ARRAY = [
    {
        label: "이메일",
        size: 3,
        name: "email",
        option: {
            placeholder: "이메일을 입력해주세요"
        },
    },
    {
        label: "비밀번호",
        size: 3,
        name: "password",
    },
    {
        label: "비밀번호 확인",
        size: 3,
        name: "password-confirm",
    },
]


const SignUpForm = ({setFormState}) => {

    const [input, onChangeInputs] = useInputs({
        //-->  setValue 할 때 name 이 키값으로 가는 객체로 value 값을 받기에, 초기값도 객체로 선언해준 것이다
        email: "",
        password: "",
        "password-confirm": ""
        //--> input 의 name 속성에 key 값을 초기값으로 맞춰준 것이다
    })

    console.log(input)
    //-->  입력값이 바뀔 때마다 상태가 바뀌는 것을 확인할 수 있고, 객체의 key 값에 따라 입력값 데이터가 저장되는 것을 확인할 수 있다

    /*
        문제: 
            disable, error 메세지 보여줄 것
            email 은 @ 포함되야함
            password 는 8글자 이상이어야함
            password-confirm 은 password 입력값이 동일해야함
            -->  이 조건들이 아니면 error 메세지가 떠야하고, 버튼이 disable 되어야한다
            -->  sign-in-form 과 유사한 게 있을 것이다  -->  이거 모듈화 시켜주자
    */

    // const isValidEmail = input.email.includes("@")
    // const isValidPassword = input.password.length >= 8
    // const isValidPasswordConfirm = input.password === input['password-confirm']

    //==>  밑에 처럼 validate-helper.js 로 모듈화 시켜줘서 주석처리 해준 것이다
    //==>  sign-in-form 도 이렇게 모듈화 시킨 것으로 유효성 검사 변수 선언했던 것들 바꿔주자

    const {isValidEmail, isValidPassword, isValidPasswordConfirm} = validateSignForm({
        email: input.email,
        password: input.password,
        passwordConfirm: input['password-confirm']
    })

    function calculateErrorMessage(name) {
        //-->  input 의 name 값을 매개변수로 받아서, 그것으로 실행되는 case 를 나눌 것이다
        switch(name) {
            case "email":
                if(input.email && !isValidEmail)
                    return "이메일 양식이 올바르지 않습니다"
                return undefined  //-->  이메일 양식이 올바르면 undefined 를 반환한다 (그냥 탈출문이다)
                //-->  switch 문 탈출만 하면 되는 것이기에 그냥 return 해도 되고 break 해도 된다

            case "password":
                if(input.password && !isValidPassword)
                    return "비밀번호는 8글자 이상 입력해주세요"
                return undefined

            case "password-confirm":
                if(input['password-confirm'] && !isValidPasswordConfirm)
                    return "비밀번호 확인이 일치하지 않습니다"
                return undefined

            default:
                return
        }
    }
    console.log(calculateErrorMessage("email"))
    //-->  name 이 email 일때, 입력값의 유효성에 따라서 값이 잘 반환되는 것을 확인할 수 있다  -->  이제 error 속성으로 함수를 실행시켜주면 된다


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
                onChange={onChangeInputs}
                error={calculateErrorMessage(form.name)}
            />)
        }
        <TDButton variant={'primary'} size={'full'} shape={'shape'}
            disabled={!isValidEmail || !isValidPassword || !isValidPasswordConfirm}
        >
            회원가입
        </TDButton>
    </S.Form>
}

export default SignUpForm

const S = {
    Form
}