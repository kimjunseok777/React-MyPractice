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
    이러한 "제약조건" 을 만드는 것이 "yup" 의 역할이다 (스키마를 만들어주고, yupResolver 에 등록하면 끝이다  -->  정말 편리하다)

    -->  yupResolver 는 "@hookform/resolvers/yup" 에서 import 받아줬다  -->  ("@hookform/resolvers" 에서 import 받은 것이 아니다)
    -->  npm i @hookform/resolvers  -->  설치는 이걸로 해줬지만 import 해온 곳이 다른 것이다 (공식문서 확인하자)

    yup : 제약조건 (유효성 검사) 을 쉽게 만들기 위한 라이브러리이다
*/

const signInFormSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다').required(" "), //-->  required 를 하게 되면 값이 없어도 에러가 생긴다는 조건을 만들어준 것이다
    // 이렇게 "yup.string().email(에러 메세지)" 해주면 얘가 자동으로 이메일양식 검사해주고, 에러메세지도 만들어주는 것이다
    //-->  "@" 가 들어가야된다는 정규표현식 같은 거 쓰지 않아도 되는 것이다 (자동으로 검사해줌)

    password: yup.string().min(8, '비밀번호는 8글자 이상 입력해주세요').required(" ")
    // 비밀번호도 마찬가지로 string 인지 확인하고, min 으로 8글자 이상인지 확인하는 것이다  -->  이렇게 "yup" 을 사용하면 제약조건을 쉽게 작성해줄 수 있다
    // min(최소) , max(최대)  -->  최소 ~ 글자 적어야한다 , 최대 ~ 글자 적을 수 있다

    //==>  여기서 이름은 register 로 등록해준 이름과 동일해야한다  -->  FormInput 가면 어떤 이름으로 등록했는지 확인 가능하다 (name 속성 전달받아서 등록해줬다)
})

/*
    이렇게 yup 으로 스키마 (제약조건) 를 생성해줬으면, yupResolver 에 등록해주면 된다
    -->  npm i @hookform/resolvers/yup 설치하고, { yupResolver } import 받은 후에 useForm 에서 resolver 의 value 값으로 사용해주면 된다

    ==>  ** 주의할점 : register 된 이름과, 스키마에서 만들어준 key 값의 이름이 같아야한다  -->  FormInput.jsx 로 가면 name 으로 등록해준 것을 확인할 수 있다
    ==>  FormInput 에서 input 의 name 으로 register 를 등록해준 것을 확인할 수 있다  -->  그래서 스키마의 key 값들을 name 과 일치시켜준 것이다
*/


const SignInForm = () => {

    const navigate = useNavigate()

    const {
        register,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onChange",  //--> "all" 로 작성해줘도 된다 (제출했을 때만이 아닌, 매번 검사하는 것)
        resolver: yupResolver(signInFormSchema),  //-->  위에서 yup 으로 만들어준 스키마를 등록해준 것이다
    })                                                                               //-->  "@hookform/resolvers/yup" 에서 import 받아준 것이다
    
    /*
        이렇게 "submit" 하는 방법이 다르다  -->  handleSubmit 이라는 친구를 onSubmit 안에 감싸주는 형태로 만들어야한다
        -->  제출이벤트로 실행시킬 함수를 handleSubmit 안에 넣어줘서 실행시켜야 한다  -->  실행시킨 함수의 매개변수로는 "data" 가 온다

        "yup" 은 제약조건을 쉽게 만들기 위해 사용하는 것이고, 이외의 사용방법은 RHF 와 같다 (그냥 상단에 제약조건을 작성해주고, resolver 로 등록해주는 것)
        -->  등록은 마찬가지로 input 태그에다가 register 로 해주는데, 스키마에 등록했을 때와 이름만 일치하면 되는 것이다 (가독성도 좋고 더 간편하다)

        유효성 검사를 쉽게하고, 원하는 시점에 랜더링 하기 위해서 (원하는 시점에만 유효성 검사를 보여주기 위해서  -->  랜더링 최적화)
    */

    // 제출이벤트로 실행시킬 함수이다  -->  handleSubmit 으로 감싸서 실행시켜주면 된다
    const handlePressSignIn = (data) => {
        if(data.email === "test@test.com" && data.password === "testtest") {
            // 원래는 event 를 매개변수로 받아줬고, event.target.value 이런식으로 사용해줬다
            //--> 하지만 yup 은  "data.등록이름"  이렇게 사용해주면 된다 (콘솔도 찍어보고, 공식문서도 잘 확인하자)
            return navigate("/todo/3")
        }
        alert("아디이와 비밀번호를 확인해주세요")
    }

    //---------------------------------------------------------------------------------------------------------------------------

    return <S.Form onSubmit={handleSubmit(handlePressSignIn)}>
        <FormInput label={"이메일"} placeholder={"email"} size={3} name={'email'} register={register}
            //-->  register 속성을 전달해줘서, FormInput 컴포넌트의 input 에 등록시켜주는 것을 확인할 수 있다
            //-->  이름 등록시켜주기 위해 name 속성도 전달받아준 것 확인할 수 있다 ( name={'email'} )
            error={errors.email?.message}
            //-->  이메일에 에러가 있다면 메세지를 실행시키는 요직을 error 속성으로 전달해준 것을 확인할 수 있다  -->  FormInput 가서 확인해보자
            //-->  여기서 메세지는 "이메일 양식이 아닙니다" 가 된다 (상단에 스키마 작성할 때 적었다)  -->  email('이메일 양식이 아닙니다')
        />

        <FormInput label={"비밀번호"} placeholder={"password"} size={3} name={'password'} register={register}
            error={errors.password?.message}
            //-->  yup 에 등록한 password 에 에러가 있다면 메세지가 뜬다  -->  min(8, '비밀번호는 8글자 이상 입력해주세요')
        />

        <TDButton variant={'primary'} size={'full'} shape={'shape'} disabled={!isValid}>{/*--> isValid : 유효성 검사에 어긋나면 false 이다*/}
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