import { createContext, useState } from "react"


// 밑에 value 로 담아준 상태들이 여기 값으로 전달되는 것이다
export const TodoContext = createContext()
//-->  앞에 "대문자" 로 해줘야된다
//-->  import 자동완성이 잘 안되면, 밑의 Provider 로 사용할 컴포넌트 먼저 만들어주고, createContext 해주면 import 자동완성 된다
//==>  다른 컴포넌트에서 useContext 로 가져오기 위해 export 해준 것이다


// Provider 는 컴포넌트로 만들어주면 된다 (전역상태의 스코프를 정하는 덮개로 쓰일 것이다)
const TodoProvider = ({children}) => {

    //-->  원래 Todo 컴포넌트에 있던 todos 배열을 만들어준 것
    //-->  상태는 반드시 덮개로 쓰일 컴포넌트 내부에 작성해줘야한다
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'title-1',
            content: 'content-1',
            state: true
        }
    ])

    //--> value 값을 배열로 전달해주면 [todos(상태배열) , setTodos(상태함수)]  -->  이렇게 전달이 된다
    //--> value 값을 객체로 전달해주면 {todos(상태배열) , setTodos(상태함수)}  -->  이렇게 전달이 된다

    //==>  value 값은 반드시 "객체" 또는 "배열" 로 데이터를 담아줘야 한다

    return <TodoContext.Provider value={{ //--> value 에 데이터 넣어줄 때는 "객체" 로 넣어도 되고 "배열" 로 넣어도 된다 (구조분해할당 할 수 있다)
        //-->  이 value 를 전달 (위에 만들었던 todos 상태 전달하는 것) 함으로써 위에 createContext 만들었던 "TodoContext" 공간에 값이 채워지는 것이다
        todos,
        setTodos
    }}>
        {children}
    </TodoContext.Provider>
    //-->  이렇게 createContext 만들어준 이름.Provider 로 태그 만들어주면 된다
}
export default TodoProvider

// 작성 다 했으면 App.js 로 이동해주자