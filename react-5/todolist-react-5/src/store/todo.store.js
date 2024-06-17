import {createContext, useContext, useState} from 'react'


const TodoContext = createContext()
//-->  매번 createContext 만들어준 것 useContext 로 가져오기 귀찮으니 밑의 방법처럼, 이 파일 내에 useContext 도 만들어주자

//-->  useContext 같은 파일에 작성해서 export 할 때는 "함수" 로 작성해야한다
export const useTodo = () => useContext(TodoContext)
//-->  이렇게 useContext 한 상태로 export 해주면, 사용할 때 이 친구만 import 해주면 된다 ("함수형" 으로 만들어줘야한다)
//-->  매번 useContext(TodoContext) 할 필요가 없어진다  -->  useTodo 만 import 하면 된다

const TodoProvider = ({children}) => {

    // todo 에 있는 상태를 전역상태관리 하고 싶어서 그대로 가져온 것이다
    //-->  전역상태관리할 훅 함수는 반드시 Provider 덮개로 만들어줄 컴포넌트 안에 있어야한다
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "example-1",
            content: "example-1",
            state: true
        },
        {
            id: 2,
            title: "example-2",
            content: "example-2",
            state: false
        },
    ])
    //--> todos 상태를 그대로 옮겨와서, value 로 채워준 것이다
    return <TodoContext.Provider value={{todos, setTodos}}>
        {children}
    </TodoContext.Provider>
}
export default TodoProvider