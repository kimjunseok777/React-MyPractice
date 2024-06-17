import { useState } from "react"


// 커스텀 훅은 앞에 반드시 use 로 시작해야한다  -->  컴포넌트가 아니기 때문에 앞에 대문자 아니어도 된다 (안에 훅이 들어가는 일반 함수이다)
const useInput = (initialValue) => {

    const [value, setValue] = useState(initialValue)  //-->  기본값을 매개변수 initialValue 로 받아주는 것이다
    //-->  기본값을 " " 로 해버리면 확장성이 떨어진다  -->  무조건 기본값이 빈 값이라고 확장성을 줄이는 것이 될수도 있기에, 매개변수로 받아준 것이다

    //==>  이렇게 매개변수 작성해주고, 로그인에서 실행할때 useInput("") 로 빈 값 넣어준 것이다 (더 확장에 용이하다)

    const onChange = (event) => {
        setValue(event.target.value)
    }
    // FormInput 의 value 가 바뀔 때마다 실행되는 함수이다  -->  onChange 로 실행시키는 것이다
    /*
        FormInput 의 값이 바뀔 때마다 여기서 setEmail 할 것이다 (입력할 때마다 상태를 바꿔주겠다는 애기이다)
        -->  FormInput 에 onChange 라는 속성을 넣어줄 것이다  -->  value 값이 바뀔 때마다 그 value 를 직접 실행해줄 수 있게 된다
    */


    return [value, onChange]
    //-->  배열이나 객체로 반환하면 된다
    //-->  "배열" 로 반환해준 이유는 이름을 내 마음대로 바꿔주기 위함이다 (email 이 될 수도 있고 password 가 될 수도 있다)

    //-->  배열은 구조분해할당 할 때 쉽게 이름을 바꿔줄 수 있다
    //-->  객체는 구조분해할당 할 때 이름을 key 값으로 가져와야하기 때문에 이름을 맘대로 바꿔주기에는 좋지 않다
}
export default useInput