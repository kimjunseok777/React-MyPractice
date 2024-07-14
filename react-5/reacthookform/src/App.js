import './App.css';
import {useForm} from 'react-hook-form'

function App() {

  // 먼저 register 해서 등록을 시켜줘야하는 것이다  -->  공식문서에 나와있다
  const {
    register,  //-->  유효성 검사를 등록시켜주는 것이다 (등록할 곳에 register 해주면 된다)
    //-->  등록시켜줄 때, 첫번째 인자로 등록시켜줄 이름이 들어가고, 두번째 인자로 조건과 메세지가 들어간다  -->  공식문서 확인해보자

    formState: {isValid, errors},  //-->  상태를 형성하는 것이다
    // isValid : 유효성 검사 어겼을 때 false 가 뜬다  -->  유효성 검사를 통과하면 true 이다  -->  disabled 에 넣을 때는 !isValid 이렇게 넣어야한다 (검사 어겼을 때 true)
    // errors : 검사 어겼을 때 true , 메세지를 달아줄 수 있다  -->  ex) error.email.message

    handleSubmit  //-->  form 의 onSubmit 이벤트 할 때, 이 handleSubmit 넣어주고, 그 안에 제출이벤트로 실행시킬 함수를 넣어주면 된다
  } = useForm({  //-->  rhf 라이브러리를 사용해준 것이다 (import 받아와야 한다)
    mode: 'all',  //-->  등록시켜준 곳에 값이 바뀔 때마다 유효성 검사를 한다 (랜더링은 유효성 검사 어겼을 때만 한다  -->  랜더링 최적화)
    defaultValues: {
      email: "email",
      password: "password"
    }
  })//-->  RHF 는 실시간 변화를 감지하는 것은 아니다  -->  그래서 이렇게 mode 를 'onChange' 또는 'all' 로 바꿔주면 실시간으로 다 감지하게 만들어줄 수 있다
  //-->  랜더링은 유효성 검사를 어겼을 때만 일어난다  -->  랜더링 최적화가 된다
  //-->  all 또는 onChange 모드 해주지 않으면 제출이 일어났을 때만 유효성 검사를 한다 (submit 일어났을 때만 유효성 검사한다)

  //-->  이렇게 하면 값이 바뀔 때마다 감지한다 (mode : "onChange" or "all")
  //-->  mode 를 생략한다면  -->  form 이 submit 이 이루어졌을 때만 작동을 한다
  //-->  defaultValues 를 넣으면 밑에 register 해준 이름으로 기본값도 넣어줄 수 있다  -->  defaultValues 는 placeholder 가 아닌, 기본적으로 적혀있는 값이다

  // 에러 시에 (유효성 검사를 어겼을 때) 나오는 말은 "메세지" 가 되는 것이다  -->  ex) errors.email.message  -->  email 의 유효성 검사를 어겼을 시에, 에러 메세지가 뜬다

  console.log(isValid, errors)

  const onPressSubmit = (event) => {
    console.log(event)
  }

  return (

    <form onSubmit={handleSubmit(onPressSubmit)}>{/*-->  이렇게 위의 handleSubmit 넣어주고, 그 안에 실행시킬 함수 넣어줘야한다*/}
    
      <input
        {...register("email", {required: "이메일을 입력해주세요", minLength: 8})}
      />
      {errors.email && errors.email.message}
      {/*이메일 에러가 있다면, 메세지를 보여줘라*/}

      <input
        {...register("password", {
          minLength: {message: "비밀번호는 8글자 이상 입력해주세요", value: 8}  //-->  message 와 value 를 통해서 값을 나타낸 것이다
        })}
      />
      {errors.password && errors.password.message}
      {/*비밀번호 에러가 있다면, 메세지를 보여줘라*/}

      <button disabled={!isValid}>제출</button>{/* -->  isValid : 유효성 검사 어겼을 때 false  -->  즉, !isValid 는 유효성 검사 어기지 않았을 때 false 이다 */}
      {/*유효하지 않은 것이 있다면, 버튼을 비활성화 시켜라*/}
    </form>

  );
}

export default App;

// 이렇게 RHF 사용해주면, 앞에서 만들었던 것처럼 useInput 커스텀훅 만들고 함수 만들고 할 필요가 없어진다  -->  굉장히 편한 거다 (RHF 잘 공부해보자)

//==>  가장 큰 장점은 validation(유효성) 을 어겼을 때만 리랜더링을 시켜준다  -->  리랜더링을 최적화 할 수 있는 것이다
