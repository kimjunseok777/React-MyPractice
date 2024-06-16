import { createContext, useState } from "react"

// 전역상태관리  -->  순서만 잘 알고 있어도 쉽게 생성할 수 있다

export const TodoContext = createContext()
//-->  앞에 대문자로 해줘야된다
//-->  import 자동완성이 잘 안되면, 밑의 컴포넌트 먼저 만들어주고 createContext 해주면 된다

//==>  다른 컴포넌트에서 useContext 로 가져오기 위해 export 해준 것이다

// Provider 는 컴포넌트로 만들어주면 된다
const TodoProvider = ({children}) => {

    //-->  원래 Todo 컴포넌트에 있던 todos 배열 만들어준 것
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'title-1',
            content: 'content-1',
            state: true
        }
    ])

    return <TodoContext.Provider value={{ //--> value 에 데이터 넣어줄 때는 객체로 넣어도 되고 배열로 넣어도 된다 (구조분해할당 할 수 있다)
        //-->  이 value 를 전달함으로써 TodoContext 에 값이 채워지는 것이다
        todos,
        setTodos
    }}>
        {children}
    </TodoContext.Provider>
    //-->  이렇게 createContext 만들어준 이름.Provider 로 태그 만들어주면 된다
}
export default TodoProvider

// 작성 다 했으면 App.js 로 이동해주자