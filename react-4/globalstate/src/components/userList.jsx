import { useReducer } from "react"
import { userReducer } from "../reducer/user.reducer"


const UserList = () => {


    // 이 컴포넌트에서 상태를 선언해줄 건데, 이번에는 useState 로 선언하지 않고, useReducer 로 선언해줄 것이다
    //-->  앞에서 만든 useReducer 함수 import 받아온 것
    //-->  여기서 dispatch 가 userReducer 로 객체 (action) 를 전달해주는 매개체이다
    const [users, dispatch] = useReducer(userReducer, [{
        id: 1,
        name: "김사과"
    }])
    // const [ 상태명 , action 전달 함수 ] = useReducer( 생성한 reducer , [ 기본값 ] )


    const handlePressAddUser = () => {
        //-->  버튼 클릭으로 이벤트 시작할 거다

        // 얘는 다른 거 다 필요없다, 그냥 dispatch 넣어주면 된다
        //--> dispatch 의 괄호 안에 action, 즉 내가 전달하고 싶은 객체를 넣으면 된다
        //--> type , payload 전달하면 된다  -->  type 으로 "추가" or "삭제" 중 어떤 요직 사용할지 정해지고, payload 는 사용될 내용물이다
        dispatch({
            type: "ADD_USER",
            payload: {
                id: Math.floor(Math.random() * 1000000),
                name: "이멜론"
            }
        })
        //-->  dispatch 가 이 객체를 앞에서 생성했던 userReducer 함수에 action 으로 전달을 해주는 것이다
        //-->  dispatch 는 "전달 매개체" 라고 생각하면 된다  -->  이 친구가 userReducer 로 action 이라는 이름으로 객체를 전달해주는 것이다 

        //==>  dispatch 괄호 안에 보이는 것처럼, 이 객체(action)만 전달하면 "어디에서든" 추가되는 요직이나, 삭제되는 요직을 실행시킬 수 있는 것이다

        // 매번 추가하는 요직을 작성하지 않아도, dispatch 로 객체(action)만 전달하면 추가가 자동으로 이루어지는 것이다
        //-->  코드를 매번 칠 필요가 없어진다
    }

    return <div>
        <button onClick={handlePressAddUser}>추가</button>
    </div>
}
export default UserList