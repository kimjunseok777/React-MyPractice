import { useDispatch, useSelector } from "react-redux"
//-->  따로 todo.reducer.js 에서 import 받은 게 없는 것을 확인할 수 있다


const Todo = () => {

    // useSelector 는 선택해서 가져오는 것  -->  store 에서 todo 에 있는 state 값만 가져오겠다는 의미이다
    //-->  initialState 값인 [{id: 1 , title: "title-1" , content: "content-1"}]  이 찍히면 잘 가지고 온 것이다

    const todoList = useSelector((store) => store.todo)  //-->  state 가 자동으로 todoList 에 담긴다
    //==>  store 로 값을 담아준 Provider 로 감싸줬다  -->  즉 store.todo 또는 store.user ... 이런 식으로 사용하면 되는 것이다
    //==>  const 변수명 = useSelector( ( ) => { } )

    //====>  **  새로운 변수 todoList 로 담아줬는데, 이게 전역상태관리가 되고 있는 것인가??  -->  확인해보자 ! ***  ==>  "useSelector" 덕분에 가능한 것인가???

    console.log(todoList)  //-->  initialState 값이 잘 온 것을 확인할 수 있다 [{ id : 1 , title : "title-1" , content : "content-1" }] 이 초기값이다  -->  초기값 안해주면 undefined 뜬다

    //-->  useSelector 를 사용하면, 어떤 컴포넌트에서든 접근이 가능하게 되는 것이다 (전역상태 관리가 이미 끝난 것  -->  context 보다 간편하다  -->  매번 Provider 만들어줄 필요 없다)

    //-->  Provider 에 전달해줬던 store 를 가져올 수 있는 것이다  -->  combineReducers({ todo , user , ... 등등 })
    //-->  키값을 todo 와 user 로 저장해줬는데, 그 중에서 todo 를 가지고 와서 사용해준 것이다  -->  useSelector( (store) => store.todo )  -->  기본값은 initialState 이다
    //-->  그렇다면, 여기서 todo 는 todo.reducer.js 에서 export 해준 함수이다 ( reducer로 실행시킬 함수가 들어있다 )
    //==>  user 로 해주면, user.reducer.js 에 있는 함수가 오는 것이다 (즉, combineReducers 에서 등록한 키값을 적어주면 되는 것이다)

    const dispatch = useDispatch()  //-->  useDispatch 는 "react-redux" 에서 import 받은 것이다 (reducer 에 action 으로 전달해주는 매개체이다)

    function handleAddTodoDispatch() {
        dispatch({
            type: "ADD_TODO",
            payload: {
                id: Math.floor(Math.random() * 1000000),
                title: "example",
                content: "example"
            }
        })
    }

    //-->  추가를 누르면 todoList 가 늘어나는 것을 확인할 수 있다  -->  전역상태관리 잘 되고 있는 것이다
    //==>  dispatch 로 store 에 전달을 하는 것이다 (Provider로 감싸줬기에 전역적으로 쓰이는 상태이다)

    return <div>
        <button onClick={handleAddTodoDispatch}>추가</button>
    </div>
}
export default Todo