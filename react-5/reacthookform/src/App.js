import './App.css';
import {useForm} from 'react-hook-form'

function App() {

  // 먼저 register 해서 등록을 시켜줘야하는 것이다  -->  공식문서에 나와있다
  const {
    register,
    formState: {isValid, errors},
    handleSubmit  //-->  form 의 onSubmit 이벤트 할 때, 이 handleSubmit 넣어주고, 그 안에 실행시킬 함수를 넣어주면 된다
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: "email",
      password: "password"
    }
  })//-->  RHF 는 실시간 변화를 감지하는 것은 아니다  -->  그래서 이렇게 mode 를 'onChange' 또는 'all' 로 바꿔주면 실시간으로 다 감지하게 만들어줄 수 있다
  //-->  이렇게 하면 값이 바뀔 때마다 감지한다
  //-->  mode 를 생략한다면  -->  form 이 submit 이 이루어졌을 때만 작동을 한다
  //-->  defaultValues 를 넣으면 밑에 register 해준 이름으로 기본값도 넣어줄 수 있다

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

      <button disabled={!isValid}></button>
      {/*유효하지 않은 것이 있다면, 버튼을 비활성화 시켜라*/}
    </form>

  );
}

export default App;

// 이렇게 RHF 사용해주면, 앞에서 만들었던 것처럼 useInput 커스텀훅 만들고 함수 만들고 할 필요가 없어진다  -->  굉장히 편한 거다 (RHF 잘 공부해보자)

//==>  가장 큰 장점은 validation(유효성) 을 어겼을 때만 리랜더링을 시켜준다  -->  리랜더링을 최적화 할 수 있는 것이다
