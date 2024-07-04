import { useReducer } from "react"
import { userReducer } from "../reducer/user.reducer"  //-->  userReducer 로 사용할 함수 import 받아준 것이다


const UserList = () => {


    // 이 컴포넌트에서 상태를 선언해줄 건데, 이번에는 useState 로 선언하지 않고, useReducer 로 선언해줄 것이다
    //-->  앞에서 만든 userReducer 함수 import 받아온 것
    //-->  여기서 dispatch 가 userReducer 로 객체 (action) 를 전달해주는 매개체이다
    const [users, dispatch] = useReducer(userReducer, [{
        id: 1,
        name: "김사과"
    }])
    // const [ 상태명 , action 전달 함수 - 즉, dispatch 적어주면 된다 ] = useReducer( action 전달할 함수 , 상태의 기본값 )


    const handlePressAddUser = () => {
        //-->  버튼 클릭이벤트로 함수 실행시킬 것다

        // 얘는 다른 거 다 필요없다, 그냥 dispatch 만 넣어주면 된다 (전달할 action 객체 넣어주면 된다)
        //==>  상태 변화 로직을 앞에서 만든 함수인 useReducer 에 이미 다 작성해놨기 때문에, 어떤 상태변화 로직을 어떤 데이터로 실행시킬지 그 정보만 전달해주면 되는 것이다

        //--> dispatch 의 괄호 안에 전달할 action, 즉 내가 전달하고 싶은 객체를 넣으면 된다
        //--> type , payload 전달하면 된다  -->  type 으로 "추가" or "삭제" 중 어떤 요직 사용할지 정해지고, payload 는 사용될 내용물이다 (상태변화에 사용될 데이터)
        //--> payload 안에 id, name 이 있다
        dispatch({
            type: "ADD_USER",  //-->  [...state, action.payload]  -->  원래 있던 상태 배열 (users) 에 payload 를 배열의 요소로 추가하는 것이다
                                               //-->  users 상태 배열은 [{ id: 1, name: "김사과"}] 이다  -->  이 배열에 요소가 추가되는 것이다  -->  [{ id : 1 , name : "김사과" } , { payload }]
            payload: {
                id: Math.floor(Math.random() * 1000000),
                name: "이멜론"
            }
        })
        //-->  dispatch 가 이 객체를 앞에서 생성했던 userReducer 함수에 action 으로 전달을 해주는 것이다
        //-->  dispatch 는 "전달 매개체" 라고 생각하면 된다  -->  이 친구가 userReducer 로 action 이라는 이름으로 객체를 전달해주는 것이다
        //-->  action 에서 객체 접근법으로 사용하면 되는 것이다

        //==>  dispatch 괄호 안에 보이는 것처럼, 이 객체(action)만 전달하면 "어디에서든" 추가되는 요직이나, 삭제되는 요직을 실행시킬 수 있는 것이다

        // 매번 추가하는 요직을 작성하지 않아도, dispatch 로 객체(action)만 전달하면 추가가 자동으로 이루어지는 것이다
        //-->  코드를 매번 칠 필요가 없어진다
    }

    return <div>
        <button onClick={handlePressAddUser}>추가</button>
        {/*-->  type 에 value 값에 따라 실행시키는 상태변화 로직이 달라지는 것이다  -->  즉, type 을 다르게 해서 재사용하면 되는 것이다*/}
        {/*dispatch로 전달할 객체의 key 또는 value 값을 따르게하면 언제든지 여러가지 요직으로 재사용이 가능한 것이다*/}
    </div>
}
export default UserList