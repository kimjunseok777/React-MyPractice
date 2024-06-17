import { useState } from "react"


const useInputs = (initialValue) => {

    const [value, setValue] = useState(initialValue)  //-->  이번에는 value 로 객체를 받을 것이다

    const onChangeInputs = (event) => {
        setValue({//-->  value 를 { 객체 } 로 만들어준 것이다
            ...value,
            [e.target.name]: event.target.value  //-->  input 의 name 속성이 key 가 되고, 입력값이 value 가 되는 것이다
            /*
                email 과 password 가 원래는 그냥 하나의 변수였는데, 객체로 쓴 것이다
                -->  이러면 상태 하나만으로 데이터를 묶을 수 있다
                -->  input 의 name : input 의 value  -->  그냥 객체화 시킨 것이다  -->  이거 하나만으로 상태를 3개, 4개 ... 만들 필요 없어진다
                -->  이 상태 하나만으로 여러개의 상태 컨트롤할 수 있는 것이다

                ==>  상태 사용할 때 값을 하나로 쓰는 것이 아니라, 객체로 만들 수 있는지, 하나의 주제로 묶을 수 있는 매번 생각해봐야한다

                ex)
                이메일일 때는  -->  email : "test@test.com"
                비밀번호일 때는  -->  password : "testtest"
            */
        })
    }
    return [value, onChangeInputs]
}
export default useInputs

/*
    input 의 name 과 value 가 짝을 이루는 "객체" 를 만듦으로써, input 하나당 useInput 만들어주는 것이 아니라
    여러개의 input 들을 useInputs 하나로 상태를 만들고 관리할 수 있는 것이다
*/

/*
    앞에 만들었던 useInput 은 하나하나 상태를 만들어줬어야 했다

    const [email, 함수명...]
    const [password, 함수...]  -->  이렇게 하나하나 만들었어야 했음


    하지만 객체로 만들어준 useInputs 는 이럴 필요 없다

    const [value, 함수명...]  -->  value.email , value.password , value.password-confirm  -->  이렇게 관리할 수 있는 것이다

    ==>  상태가 여러개가 아니라 하나의 상태로 관리할 수 있는 것이다
*/