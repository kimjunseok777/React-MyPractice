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

    //----------------------------------------------------------------------------------------------
    // msw 수업 :
    //-->  로그인 제출 이벤트로 발생하는 handlePressSignIn 함수 안에 작성해준다
    const handlePressSignIn = async (data) => { //-->  async 로 비동기 함수라고 정의했다 (이제 이 함수는 Promise 객체를 반환한다)

        try{ //==> 에러 핸들링 하기 위해 try , catch 사용해준 것이다
            //==>  async 함수 내에서 발생하는 오류는 try , catch 문으로 처리할 수 있음

            //--------------------------------------------------------------------------------------------
            // 삭제한 부분 :
            // if(data.email === "test@test.com" && data.password === "testtest") {  -->  실제로 백엔드에게 요청하는 요직으로 바꿀 것이다
            //     return navigate("/todo/3")
            // }
            //--------------------------------------------------------------------------------------------

            // fetch 에 주소 적을 때는 "백엔드의 로그인 하는 주소" 적으면 된다  -->  백엔드가 설정해서 프론트에게 알려준 주소이다 (지금은 가짜로 만들어놓은 것이다)
            // "/api/user/login"  -->  이 주소에 데이터를 요청하는 것이다 (이 주소 안에는 조건에 따라 프론트에게 전송해주는 데이터가 담겨있다)

            //==>  이 response 를 json 화 시켜서 response_data 에 담아줄 것이다 (await 무조건 걸어야한다)
            const response = await fetch("/api/user/login", {
                //-->  fetch 는 자바스크립트에서 내장된 "빌트인객체" 이다 (Math.random 같은 것처럼 아예 자바스크립트에서 내장된 기능)
                //-->  "/api/user/login" 는 백엔드 주소이다 (우리가 데이터를 보내는 목적지이다  -->  아래 있는 "post" 라는 메소드로 body 데이터를 보내는 것이다)

                /*
                    async :
                        -->  비동기 함수를 정의하기 위해 사용되는 키워드이다 (비동기 함수는 async 키워드로 정의된다  -->  내부에서 비동기 작업을 수행한다)
                        -->  async 키워드를 함수 선언 앞에 붙이면, 해당 함수는 항상  "Promise 객체"  를 반환한다
                        -->  async 함수 내에서 발생하는 오류는 try , catch 구문으로 처리할 수 있다 (에러 핸들링)
                        -->  async 함수 내에서는 await 키워드를 사용할 수 있는데, await 은 Promise가 처리될 때까지 함수의 실행을 일시 정지하고, Promise가 처리되면 그 결과 값을 반환한다

                    fetch :
                        -->  fetch 는 데이터를 응답받으면 json 형태로 오지 않고, Promise 형태의 "body" 라고 하는 응답데이터 형태로 온다 (string 데이터를 응답받는다)
                        -->  Promise 는 아직 진행이 되기 전 상태이며 "비동기" 이기 때문에 await 을 걸거나, then 을 통해서 비동기 처리를 해줘야 한다
                        -->  fetch 로 받아온 데이터의 형태는 json 이 아니라 string 즉, 문자열 이기 때문에 json 으로 바꿔줘야한다

                    await :
                        -->  await 은 비동기에서 "기다려" 라고 명령을 내린 부분이다
                        -->  fetch 는 비동기이기 때문에, await 을 걸지 않으면 밑에 있는 alert 가 먼저 실행이 돼버린다  -->  심지어 alert 의 확인을 누르면 코드들을 다시 실행하지조차 않는다
                        -->  그렇기에 await 을 걸어서 이 코드를 "동기" 적으로 만들어준 것이다
                        -->  await 은 자바스크립트에서 비동기 함수 (async function) 내에서 사용되는 키워드로, 프로미스(Promise)가 해결될 때까지 함수의 실행을 중지하고, 프로미스가
                                해결되면 결과 값을 반환하다  -->  이는 비동기 코드를 "동기식" 코드처럼 읽고 작성할 수 있게 도와준다
                        -->  await는 오직 async function (비동기 함수) 내부에서만 사용할 수 있다  -->  일반 함수에서는 사용할 수 없습니다
                        -->  await 은 응답이 올 때까지 기다리는 것이다

                    method :
                        같은 이름 ("/api/user/login") 이어도 "재사용" 할 수 있게 해주는 친구이다  -->  post(등록) , get(조회) , push(수정) , patch(수정) , delete(삭제)
                        -->  이렇게 메소드에 따라 같은 주소 ("/api/user/login") 여도 다른 기능을 할 수 있도록 만들어 놓은 것이다
                        -->  즉, 같은 이름 (같은 백엔드 주소) 여도 메소드를 다르게 설정하면, 같은 이름으로 여러개 만들 수 있는 것이다
                        -->  이 메소드를 정하는 주체는 "백엔드" 개발자이다

                    body :
                        -->  post 나 patch ... 요청 등의 내부에 데이터를 포장해서  -->  즉, 데이터를 안에 넣어서 보내게 되는데, 이 요청이 (body) https 통신에서는 "암호화" 가 된다
                        -->  body 안에 있는 내용은 "암호화" 되어서 전달되기 때문에 해커들이 유저들의 데이터를 찾으려고 해도 절대 찾을 수 없다
                        -->  보안적으로 중요한 경우가 있거나, 데이터를 "객체" 형태로 보내야될 때는 이렇게 body 에 있는 데이터로 보내면 된다
                */

                // 이 안에는 전송할 데이터를 적으면 된다 (email 과 password 가 필요하다는 사실도 백엔드가 알려주는 것이다)
                // "/api/user/login" 이란 백엔드 주소에 아래에 있는 body 데이터를 보내는 것이다
                method: "post", //-->  method 를 적지 않으면 기본값이 "get" 이기 때문에 "post" 라고 명시해줘야한다  -->  앞에 user.api 에서 post 로 데이터 받는 걸로 설정해놨다
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            }) // .then((res) => res.json())
            //-->  이렇게 적으면 받아온 데이터를 json 으로 바꾸는 것 까지 상단에 적어놓은 await 이 적용되기에, 아래 response_data 처럼 await 한번 더 안 적어도 된다
            //-->  굳이 이렇게 안하고, 아래 response_data 처럼 await 걸어 놓고 사용해도 된다
            //-->  Promise 형태로 데이터가 오기 때문에, await 을 걸어줘야한다

            //==>  이렇게 데이터를 전송하면, user.api.js 에서 매개변수 "request" 에 담기는 것인가? 그렇다면 객체형태로 데이터를보냈는데, 왜 또 json() 을 사용한 것일까?
            //==>  fetch 로 응답받은 데이터는 "문자열" 형태로 오기 때문에 json() 시켜서 "객체" 로 바꿔준 것인가?
            //==>  user.pai.js 와 함께 공부해보자

            // fetch 에서 받아온 데이터는 string 형태로 오기 때문에, json 으로 바꿔줘야한다
            // then 안써준다면 아래처럼 바꿔주면 된다  -->  이렇게 해줘도 된다 (이렇게 await 두번 걸어도 상관 없다)
            const response_data = await response.json()
            if(response_data.status === 200) {
                navigate("/todo/3")  //-->  성공했다면 투두페이지로 이동하는 것이다
                //-->  성공했다면, 백엔드에서는 "token" 을 준다
            }
            // status 가 400 이면 bad request 이니까 에러에 잡히는 것인가?
        } catch(err) { //-->  에러가 나면 여기 catch 가 잡아줘서 "alert(err.error)" 형태로 에러를 보여주는 것이다 (에러를 중간에서 가로채는 것이다)
            alert(err.error) //-->  에러메세지 잘 안떠서 일단 주석처리 해놓은 것
            // alert("아이디와 비밀번호를 확인해주세요")
        }
        // alert("아디이와 비밀번호를 확인해주세요")  //-->  try , catch 로 에러 핸들링 해서 백엔드에서 받아온 데이터로 알림창 띄우기에 이젠 필요 없다
    }
    //----------------------------------------------------------------------------------------------


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
    };
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