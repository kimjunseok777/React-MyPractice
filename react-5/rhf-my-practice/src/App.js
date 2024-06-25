import './App.css';
import {useForm} from 'react-hook-form'

function App() {

  const {
    register,
    handleSubmit,
    // formState  -->  양식이 현재 어떤 상태인지를 담고 있는 것  -->  이 안에는 여러가지 속성들이 있다 (제출, 에러, 제출 전, 중 등등... 여러가지 다룰 수 있음)
    formState: {isSubmitting, errors, isSubmitted}
    // isSubmitting  -->  양식이 제출 되는 중에 true 가 되고, 양식 제출이 끝나거나 아닌 경우에는 false 이다 (disabled 속성에 넣으면 된다)
    // 입력값 검증에 실패하면 오류 메세지를 보여줘야하는데, 이 오류메세지는 formState 에 "errors" 라고 하는 객체에 담겨져 들어온다

    // isSubmitted  -->  사용자가 제출버튼을 한번이라도 클릭하면 true 가 된는 것이다  -->  한번도 클릭하지 않았다면 false 가 된다
    //==>  양시식이 제출된적이 있을 때만 "aria-invalid" 를 true 또는  false 로 설정해주기 위함이다

  } = useForm()

  return (
    <form
      noValidate//-->  type 으로 유효성 검사 안하는 것 (email, password... 등등)
      onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
    >

      <label htmlFor='email'>이메일</label>
      <input id='email' type='email' placeholder='test@email.com'
      //-->  register 함수의 두번째 인자로 옵션을 넘길 수 있다 (여기에 유효성 검사 요직을 넣으면 된다)
        {...register("email", {
          required: "이메일은 필수 입력입니다",
          pattern: {
            value: /\S+@\S+\.\S+/,
            // 이메일 검증에 많이 사용되는 간단한 정규표현식이다  -->  /\S+@\S+\.\S+/
            message: "이메일 형식에 맞지 않습니다"
          }
        })}
        aria-invalid={isSubmitted ? (errors.email ? "true" : "false") : undefined}
        //-->  aria-invalid 가 true 이면 입력박스의 테두리가 생긴다  -->  이메일에 errors 가 있으면 true 가 되는 것이다
      />
      {errors.email && <small>{errors.email.message}</small>}
      {/*errors 라는 객체에 이메일이 들어있다면?  -->  email 검증에 실패했다는 소리이다*/}
      {/*-->  검증이 실패했을 때  --> required 의 메세지나, 또는 pattern 의 메세지를 보여주게 된다*/}

      <label htmlFor='password'>비밀번호</label>
      <input id='password' type='password' placeholder='********'
        {...register("password", {
          required: "비밀번호는 필수 입력입니다",
          minLength: {
            value: 8,
            message: "비밀번호는 8자 이상 입력해주세요"
          }
        })}
        aria-invalid={isSubmitted ? (errors.password ? "true" : "false") : undefined}
      />
      {errors.password && <small>{errors.password.message}</small>}
      {/*비밀번호 검증에 실패했을 때  -->  required 의 메세지 또는 minLength 의 메세지가 보여지게 되는 것이다*/}

      <button type='submit' disabled={isSubmitting}>
        로그인
      </button>

    </form>
  );
}

export default App;
