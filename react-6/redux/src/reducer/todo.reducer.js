

// 이렇게 파일 만들 때 "점" 을 두개 쓰면 "todo" 가 메인 이름이 되고, "reducer" 가 설명이 된다, 그리고 마지막의 js 가 확장자(exe) 가 되는 것이다
//-->  결론은 파일명 작성할 때 점이 두개 들어가도 상관 없다

//==>  useReducer 그대로 사용해주면 된다  -->  "react-4" 가서 useReducer 공부 마치고 redux 공부하자

// 함수 이름은 마음대로 작성해줘도 된다
//-->  사용할 때 useReducer 를 import 받는 것이다  -->  현재는 사용하는 것이 아닌, useReducer 로 사용할 함수를 "생성" 해주는 것이다

const initialState = [
    {
        id: 1,
        title: "title-1",
        content: "content-1"
    },
]

// state 의 기본값을 initialState 로 준 것이다 (defaultValue)  -->  useReducer 로 상태를 생성할 때 [{ id : 1 , title : "title-1" , content: "content-1" }] 가 기본값이 되는 것이다
const reducer = (state=initialState, action) => {
    switch(action.type) {

        case "ADD_TODO":
            return [...state, action.payload]  //-->  기존의 배열에서 요소를 추가하는 요직이다  -->  payload: { id : ? , title : ? , content : ? } 이러한 객체가 담긴 데이터가 오는 것이다

        default:
            return state //==> default 는 반드시 기본의 state 를 return 해줘야한다 (안그러면 오류뜬다)
    }
}
export default reducer