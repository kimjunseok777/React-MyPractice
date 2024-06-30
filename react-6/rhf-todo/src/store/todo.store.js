import { createContext, useContext, useState } from "react";

const TodoContext = createContext()
export const useTodo = () => useContext(TodoContext)
// 매번 useContext(TodoContext) import 하지 않아도 useTodo만 import해서 사용 가능  -->  조금 편해지는 정도

const TodoProvider = ({children}) => {

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

    return <TodoContext.Provider value={{todos, setTodos}}>
        {children}
    </TodoContext.Provider>
}
export default TodoProvider