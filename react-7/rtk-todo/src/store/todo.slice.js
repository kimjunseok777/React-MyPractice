import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    todo: [  //-->  기본값이 없으면 빈배열 넣어주면 된다
        {
            id: 1,
            title: "title-1",
            content: "content-1",
        }
    ]
}


// 작성하기 전에 반드시 공식문서 확인해보자 ***
export const todoSlice = createSlice({
    name: "todo", //-->  createSlice 작성하고, 이 친구의 이름을 정해준 것이다
                             //-->  이 name 은 todo 말고 또 추가될 다른 slice 들이랑 겹치면 안된다 ***  -->  이 친구가 key 값이 되는 것이다

    initialState, //-->  이렇게 initialState 넣지 않으면 기본값이 undefined 로 찍힌다 (넣어주는 것이 좋다)  -->  공식문서와 똑같이 한 것이다 ***

    // 그냥 reducer 에서는 switch 문에서 case 를 작성해줬다면, RTK 에서는 이것이 reducers 안에 있는 key 값들이라고 보면 된다 (addTodo, deleteTodo ... 등등)
    reducers: {

        //-->  공식문서에서는 increment, decrement ... 등등 으로 되어있는데, 이 부분이 action.type 이라고 보면 된다 (이 type 을 정해주면 자동이로 이뤄지는 것이다)
        addTodo: (state, action) => {  //-->  매개변수로 "상태" 와 action 이라는 이름의 "객체" 를 받는다
            state.todo.unshift(action.payload)  //-->  이렇게 불변성을 지키지 않고도 상태변화를 시킬 수 있다  -->  ex) [...state] 같은 복사본 생성하는 거 안해도 된다
            //-->  initialState 객체 안에 todo 라는 배열이 들어가 있기 때문에, state.todo 이렇게 접근해줘야 되는 것이다
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload.id)
            //-->  dispatch 에서 객체를 전달할 때, payload: 3 할지, 아니면 payload: {id: 3} 할지는 내 마음이다
            //-->  즉, 어떻게 전달받을 건지에 따라 다르게, 내 마음대로 작성해주면 되는 것이다
        },
        updateTodo: (state, action) => {
            //-->  사용할 때 이 이름이 자동으로 type 명이 되고, 이 함수안에 작성하는 것이 자동으로 payload 가 되는 것이다  -->  dispatch( updateTodo( ... ) )
            const findTodo = state.todo.find((todo) => todo.id === action.payload.id)
            findTodo.content = action.payload.content
        },
    }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions  //-->  action 을 export 시켜준 것이다
export default todoSlice.reducer  //-->  todoSlice 가 가지고 있는 key 인 reducer 를 export 해준 것이다
                                                            //-->  이 reducer 는 key 로 addTodo , deleteTodo , updateTodo 를 가지고 있다
// action 과 reducer 를 export 해준 것이다