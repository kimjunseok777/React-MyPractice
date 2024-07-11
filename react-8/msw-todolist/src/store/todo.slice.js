import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    todo: [
        // {
        //     id: 1,
        //     title: "title-1",
        //     content: "content-1",
        //     state: true
        // },
        // {
        //     id: 2,
        //     title: "title-2",
        //     content: "content-2",
        //     state: false
        // },
    ]  //==>  백엔드에서 데이터 불러올거기에, 이제 initialState 도 필요없어진다 (비워주자)
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload)
        },

        //--------------------------------------------------------------------------
        //-->  백엔드에서 불러온 데이터를 state.todo 에 셋팅하기 위해서 reducer 에 getTodo 를 추가해준 것이다 (전역상태관리 추가해준 것)

        /**
         * jsDocs
         * ==> 이렇게 jsDocs 로 메모한 상태에서 하단에 있는 getTodos 에 마우스 올려보면 payload 가 나온다
         * @description
         * 해당 reducer 는 서버에 요청된 todos를 불러와 state에 set하는 reducer입니다
         * @payload
         * Array<{
         *  id: string
         *  content: string
         *  title: string
         * }>
         * @example
         * @todo: 리팩터링 필요함
        */
        getTodos: (state, action) => {
            state.todo = action.payload
        },
        //--------------------------------------------------------------------------

        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload.id)
        },
        updateTodo: (state, action) => {
            const findTodo = state.todo.find((todo) => todo.id === action.payload.id)
            findTodo.content = action.payload.content
        },
    }
})

export const { addTodo, deleteTodo, updateTodo, getTodos } = todoSlice.actions
//-->  getTodos 새로 만들었으니 추가해줬다
// export const { getTodos } = todoSlice.actions
export default todoSlice.reducer