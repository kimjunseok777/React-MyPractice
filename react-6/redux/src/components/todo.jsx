import { useDispatch, useSelector } from "react-redux"


const Todo = () => {

    // useSelector 는 선택해서 가져오는 것  -->  store 에서 todo 에 있는 state 값만 가져오겠다는 의미이다
    //-->  initialState 값인 [{id: 1 , title: "title-1" , content: "content-1"}]  이 찍히면 잘 가지고 온 것이다
    const todoList = useSelector((store) => store.todo)  //-->  state 가 자동으로 todoList 에 담긴다

    console.log(todoList)  //-->  initialState 값이 잘 온 것을 확인할 수 있다

    //-->  useSelector 를 사용하면, 어떤 컴포넌트에서든 접근이 가능하다 (전역상태 관리가 이미 끝난 것  -->  context 보다 간편하다  -->  매번 Provider 만들어줄 필요 없다)

    //-->  Provider 에 전달해줬던 store 를 가지올 수 있는 것이다
    //-->  키값을 todo 와 user 로 저장해줬는데, 그 중에서 todo 를 가지고 와서 사용해준 것이다
    //-->  그렇다면, 여기서 todo 는 todo.reducer.js 에서 export 해준 함수이다 (reducer로 실행시킬 함수가 들어있다)
    //==>  user 로 해주면, user.reducer.js 에 있는 함수가 오는 것이다 (등록한 키값을 적어주면 되는 것이다)

    const dispatch = useDispatch()  //-->  useDispatch 는 redux 에서 import 받은 것이다
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
    //-->  추가를 누르면 todoList 가 늘어나는 것을 확인할 수 있따  -->  전역상태관리 잘 되고 있는 것이다
    //==>  dispatch 로 store 에 전달을 하는 것이다 (Provider로 감싸줬기에 전역적으로 쓰이는 상태이다)

    return <div>
        <button onClick={handleAddTodoDispatch}>추가</button>
    </div>
}
export default Todo