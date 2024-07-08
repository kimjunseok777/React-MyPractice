import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    // 기본값은 "객체" 안에 todo 라는 key 값으로 "배열" 이 들어가있는 형태이다  -->  즉, 이 todo 라는 배열에 접근하려면 객체 접근법으로 써야한다
    todo: [  //-->  기본값이 없으면 빈배열 넣어주면 된다  -->  ex) todo : [ ]
        {
            id: 1,
            title: "title-1",
            content: "content-1",
            state: true
        },
        {
            id: 2,
            title: "title-2",
            content: "content-2",
            state: false
        },
    ]
}


// 작성하기 전에 반드시 공식문서 확인해보자 ***
// 기본 redux 에서는 createSlice 처럼 import 받은 것 없이 매개변수로 state와 action을 받는 기본적인 함수 만들어줬었다
export const todoSlice = createSlice({
    name: "todo", //-->  logger 사용할 때, 이 이름으로 뜨는 것을 확인할 수 있다
                             //-->  createSlice 작성하고, 이 친구의 이름을 정해준 것이다
                             //-->  이 name 은 todo 말고 또 추가될 다른 slice 들이랑 겹치면 안된다 ***  -->  이 친구가 key 값이 되는 것이다

    initialState, //-->  이렇게 initialState 넣지 않으면 기본값이 undefined 로 찍힌다 (넣어주는 것이 좋다)  -->  공식문서와 똑같이 한 것이다 ***

    // 그냥 reducer 에서는 switch 문의 case 로 작성해줬다면, RTK 에서는 이것이 "reducers" 안에 있는 key 값들이라고 보면 된다 (addTodo, deleteTodo ... 등등)
    reducers: {

        //-->  공식문서에서는 increment, decrement ... 등등 으로 되어있는데, 이 부분이 action.type 이라고 보면 된다 (이 type 을 정해주면 자동으로 이뤄지는 것이다)
        // 전달받을 객체가 필요 없는 경우에는, 매개변수에서 action 을 받지 않아도 된다 (공식문서에서 확인 가능하다)

        addTodo: (state, action) => {  //-->  매개변수로 "상태" 와 action 이라는 이름의 "객체" 를 받는다
            state.todo.push(action.payload)  //-->  이렇게 불변성을 지키지 않고도 상태변화를 시킬 수 있다  -->  ex) [...state] 같은 복사본 생성하는 거 안해도 된다
            //-->  initialState 객체 안에 todo 라는 배열이 들어가 있기 때문에, state.todo 이렇게 접근해줘야 되는 것이다  -->  여기서 state 는 상태 기본값인 initialState 이다
            //-->  ex) initialState = { todo : [ ... ] }  -->  이런 형태이기 때문이다  -->  state.todo 이렇게 접근해야 todo 라는 배열이 나오는 것이다
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((todo) => todo.id !== action.payload.id)
            //-->  dispatch 에서 객체를 전달할 때,  "payload: 3"  할지, 아니면  "payload: {id: 3}"  할지는 내 마음이다
            //-->  즉, 어떻게 전달받을 건지에 따라 다르게, 내 마음대로 작성해주면 되는 것이다  -->  action.payload 또는 action.payload.id
        },
        updateTodo: (state, action) => {
            //-->  사용할 때 이 이름이 자동으로 type 명이 되고, 이 함수안에 작성하는 것이 자동으로 payload 가 되는 것이다  -->  dispatch( updateTodo( { ... } ) )
            const findTodo = state.todo.find((todo) => todo.id === action.payload.id)  //-->  id 값이 같은 객체 (배열의 요소) 를 반환한다
            findTodo.content = action.payload.content  //-->  id 값이 같은 요소의 content 값을 dispatch 로 받아온 데이터로 바꾼다
        },
    }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions  //-->  action 을 export 시켜준 것이다
export default todoSlice.reducer  //-->  todoSlice 가 가지고 있는 key 인 reducer 를 export 해준 것이다
                                                            //-->  이 reducer 는 key 로 addTodo , deleteTodo , updateTodo 를 가지고 있다
// action 과 reducer 를 export 해준 것이다

/*
    rtk 의 reducer 를 작성할 때, 이 파일 안에서 export 해주는 것이 많다  -->  각 export 해주는 것이 어디서 쓰이는지 정리해보자

    * export const todoSlice = createSlice({ ... })
            -->  

    * export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions
            -->  사용할 때, dispatch 안에 함수로 사용해주기 위해 export 해준 것이다  -->  dispatch( addTodo( ... ) ) 이런식으로 사용한다
            -->  상태 변화 요직이 있는 oneTodo.jsx 나 addTodoModal.jsx 에 가면 확인이 가능하다

    * export default todoSlice.reducer
            -->  store.js 에서 todoReducer 라는 이름으로 import 받아줘서 configureStore 의 reducer 에서 todo 라는 key 의 value 값으로 넣어줬다
            -->  reducer : { todo: todoReducer }  -->  이렇게 key 값만 추가하고 만들었던 slice 만 넣어주면 전역상태 관리가 되는 것이다 (combineReducers 역할을 하는 것이다)
*/