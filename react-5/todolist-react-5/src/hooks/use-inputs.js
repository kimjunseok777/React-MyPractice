import { useState } from "react"


 //-->  이번에는 value 로 객체를 받을 것이다  -->  기본값 넣을 때도 객체로 넣어야한다
const useInputs = (initialValue) => {

    const [value, setValue] = useState(initialValue)

    //-->  event 가 들어오면 setValue 하는데, event 의 input 의 name 과 input 의 value 로 객체로 만들겠다는 뜻이다 (같은 key 가 들어오면, 나중에 들어온 것이 덮어 씌운다)
    const onChangeInputs = (event) => {
        setValue({//-->  value 를 { 객체 } 로 만들어준 것이다
            ...value,//-->  기본값을 객체로 넣어준 것을 확인 가능하다 (sign-up-form.jsx)
            [event.target.name]: event.target.value  //-->  input 의 name 속성이 key 가 되고, 입력값이 value 가 되는 것이다
                                                                                   //-->  key 에 따라 입력값 저장되는 공간이 달라지는 것이다
            /*
                email 과 password 가 원래는 그냥 하나의 변수였는데, 객체로 쓴 것이다
                -->  이러면 상태 하나만으로 데이터를 묶을 수 있다
                -->  input 의 name : input 의 value  -->  그냥 객체화 시킨 것이다  -->  이거 하나만으로 상태를 3개, 4개 ... 만들 필요가 없어진다
                -->  이 상태 하나만으로 여러개의 같은 요직인 상태를 컨트롤할 수 있는 것이다

                ==>  상태 사용할 때 값을 하나로 쓰는 것이 아니라, 객체로 만들 수 있는지, 하나의 주제로 묶을 수 있는 매번 생각해봐야한다

                ex)
                이메일일 때는  -->  email : "test@test.com"
                비밀번호일 때는  -->  password : "testtest"  -->  이런식으로 입력값이 저장되는 것이다
            */
        })
    }
    return [value, onChangeInputs]
    //-->  함수에서 실행시키는 setValue 가 객체형태로 데이터를 변형시키고, 상태를 변형시키는 것이다 (value 도 기본값이 객체로 들어간다)
}
export default useInputs

/*
    input 의 name 과 value 가 짝을 이루는 "객체" 를 만듦으로써, input 하나당 useInput 만들어주는 것이 아니라
    여러개의 input 들을 useInputs 하나로 상태를 만들고 관리할 수 있는 것이다
*/

/*
    앞에 만들었던 useInput 은 하나하나 상태를 만들어줬어야 했다

    const [ 상태명(email) , 함수명... ]
    const [ 상태명(password) , 함수명... ]  -->  이렇게 하나하나 만들었어야 했음


    --------------------------------------------------------------------------------------------------------------------


    하지만 객체로 만들어준 useInputs 는 이럴 필요 없다

    const [value, 함수명...]  -->  value.email , value.password , value.password-confirm  -->  이렇게 관리할 수 있는 것이다

    ==>  상태가 여러개가 아니라 하나의 상태로 관리할 수 있는 것이다 (상태 하나이기에, 상태 이름도 value 로 동일한 것이다)
*/