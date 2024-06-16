
// 그냥 이름이 userReducer 인 흔한 일반 함수를 만들어준 것이다

//-->  useReducer 는 이렇게 함수 형태로 만들어줘야 한다
//-->  매개변수 이름은 상관 없지만, 순서는 중요하다  -->  ( state , action )  -->  첫번째가 상태인 state, 두번째가 객체로 전달되는 action
//-->  action 은 전달받는 객체이다, state 는 상태이다
export const userReducer = (state, action) => {

    // 객체의 key 값으로 스위치문을 만든다  -->  전달받은 키값으로 상태를 변경하는 요직이 다르게 실행하는 것이다
    switch(action.type) {

        // 추가 (Create)
        case "ADD_USER": 
            return [...state, action.payload]
            // 이러한 상태변경 요직을 재사용할 수 있다는 것이 가장 큰 장점이다

        // 삭제 (Delete)
        case "DELETE_USER":
            return state.filter((user) => user.id !== action.payload.id)
            //-->  삭제는 filter 를 쓴것만으로도 "새로운 배열" 이 생성되기에, [ 대괄호 ] 로 감싸주지 않은 것이다

        default :
            return state
    }
}
//==>  상태가 복잡하거나, 상태 변경 로직이 복잡하거나, 재사용이 많이 되는 경우  -->  reducer 를 사용하면 편리해진다