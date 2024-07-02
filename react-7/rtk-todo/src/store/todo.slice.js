import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    todo: [
        {
            id: 1,
            title: "title-1",
            content: "content-1",
        }
    ]
}

// 작성하기 전에 반드시 공식문서 확인해보자 ***
export const todoSlice = createSlice({
    name: "todo",

    initialState, //-->  이렇게 initialState 넣지 않으면 기본값이 undefined 로 찍힌다 (넣어주는 것이 좋다)

    // 그냥 reducer 에서는 switch 문에서 case 를 작성해줬다면, RTK 에서는 이것이 reducers 안에 있는 key 값들이라고 보면 된다
    reducers: {
        addTodo: (state, action) => {
            state.todo.unshift(action.payload)
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload.id)
            //-->  dispatch 에서 객체를 전달할 때, payload: 3 할지, 아니면 payload: {id: 3} 할지는 내 마음이다
            //-->  어떻게 전달받을 건지에 따라 다르게, 내 마음대로 작성해주면 되는 것이다
        },
        updateTodo: (state, action) => {
            const findTodo = state.todo.find((todo) => todo.id === action.payload.id)
            findTodo.content = action.payload.content
        },
    }
})

export const {addTodo, deleteTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer
// action 과 reducer 를 export 해준 것이다