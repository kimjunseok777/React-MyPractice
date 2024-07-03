import { combineReducers } from "redux";
import todo from "./todo.reducer"  //-->  export default reducer  -->  todo 로 import 받아준 것이다
import user from "./user.reducer"
// import 한 이름이 key 값이 되기 때문에 중요하다 (todo, user)

//-->  combineReducers 안에 앞에서 만든 useReducer 로 실행시킬 함수들을 넣어준 것이다
// 중앙에 저장할 reducer 를 합치고 key 로 분류하기 위한 코드이다
export const rootReducer = combineReducers({todo})  //-->  여기 안에 import 받아온 것들 등록만 해주면 되는 것이다

//==>  이렇게 combineReducers 안에 등록만 해주면 되는 것이다
//==>  상태 하나하나마다 Provider 를 생성해주지 않아도 된다는 장점이 있다