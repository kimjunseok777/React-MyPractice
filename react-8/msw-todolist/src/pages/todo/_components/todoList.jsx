import styled from "styled-components"
import OneTodo from "./oneTodo"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getTodos } from "../../../store/todo.slice"

const TodoList = () => {

    const todos = useSelector((store) => store.todo.todo) //-->  todo: [ ]  -->  이제 여기다가 백엔드에서 get 전달받고, dispatch 하면 된다
    const dispatch = useDispatch()

    //---------------------------------------------------------------------
    // msw 수업 :

    // useEffect 는 async 를 붙여줄 수가 없다  -->  then 을 써주는 방법과, 밖에서 async 붙여준 함수를 만들어주는 방법이 있다
    //--> useEffect( async () => {} )  -->  이렇게 사용할 수 없다

    //-->  React 공식문서에서 useEffect 부분 가서 확인해보자  -->  useEffect 안에 async 붙여준 함수를 만들면 된다 (실행도 같이 시켜줘야한다)
    useEffect(() => {
        // fetch("/api/todo") //--> fetch 는 비동기이기에 이렇게 쓰면 안된다  -->  await 또는 then 같은 비동기처리 해야한다

        //-----------------------------------------------------------------------------------------------------------------
        // then 사용 :
        // fetch("/api/todo").then((res) => res.json()).then((data) => dispatch(getTodos(data)))

        //-----------------------------------------------------------------------------------------------------------------
        // async 사용 :
        async function fetchTodos() { //-->  useEffect 안에 async 함수 만들어준 것
            const result = await fetch("/api/todo") //-->  todo.api.js 에서 메소드를 "get" 으로 해준 데이터 응답받는다
                                                                                //-->  method 기본값은 get 이기에, 따로 작성 안해준 것이다
            // "/api/todo" 라고 하는 Mocking api 서버를 안 만들었다면, 프론트에 전송될까, 백엔드(가상)에 전송될까?  -->  프론트에 전송된다
            // 프론트에 요청하면 html 을 반환한다  -->  그래서 <Document... 와 같은 에러가 뜬다
            //-->  즉, handler.js 로 가서 가상 api 등록시켜줘야한다
                                                                                
            const data = await result.json() //-->  json 함수도 promise 이기에 await 걸어줘야한다
            dispatch(getTodos(data.data)) //-->  백엔드에서 오는 응답데이터에서 배열의 이름을 data 로 작성했기에, data 이름으로 객체접근법 사용해준 것
        }
        fetchTodos() //-->  async 사용하기 위해 함수를 만들었으니, 이렇게 실행까지 시켜줘야한다

    }, [dispatch])
    //-->  이렇게 하면 처음에 todos 는 빈 배열이 왔다가, useEffect 로 바로 백엔드에서 온 배열로 데이터가 채워지는 것이다
    //-->  useEffect 안에 async 함수를 만들고, 동시에 실행시켜준 것이다 (모두 비동기처리인 await 을 사용하기 위함이다)

    //---------------------------------------------------------------------

    return (
        <S.Wrapper>
            {todos.map((todo)=>(
                <OneTodo key={todo.id} todo={todo}/>
            ))}
        </S.Wrapper>
    )
}
export default TodoList

const Wrapper = styled.div`
    padding: 32px 0;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const S = {
    Wrapper
}