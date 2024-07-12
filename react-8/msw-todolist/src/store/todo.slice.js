import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    todo: [],
    // 투두리스트가 로딩중 이란 것을 보여주자
    addTodoState: {
        loading: false, //--> 아무것도 요청이 안올 때는 로딩이 false 인 상태이다
        done: false, //-->  done 은 요청이 성공이든 실패든 끝났는지, 끝나지 않았는지 확인하는 친구이다
        error: null,
    }
    /*
        투두가 요청중이라면 : loading 을 true 로 바꿔야한다  -->  전역상태이기에 dispatch 해야한다
        투두가 성공했다면 : loading 은 false 로 바꾸고, done 은 true 로 바꿔줘야한다, todo 는 값 채워줘야한다  -->  [...state, newTodo]  -->  dispatch
        투두가 실패했다면 : loading 은 false 로 바꾸고, done 은 true 로 바꿔줘야한다, error 에 메세지 넣어야한다  -->  error.message  -->  dispatch

        ==>  dispatch 3번 해야한다  -->  이렇게 dispatch 를 여러번 하게 redux 가 만들었을까? (contextApi 사용했다면 진짜로 dispatch 3번 다해야한다)
        ==>  redux 의 thunk 를 사용하면 3번 다 하지 않아도, 얘네들이 알아서 dispatch 를 요청해준다

        ==>  백엔드에서 요청했을 때 변화하는 다양한 상태값을 쉽게하기 위해서 사용하는 것이 redux thunk 이다

        아래에 createAsyncThunk 만들어주고, reducers 가 아닌 extraReducers 새로 만들어주자
    */
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // addTodo: (state, action) => {
        //     state.todo.push(action.payload)
        // },

        //==>  extraReducers 로 사용해주기 위해 addTodo 빼줬다

        //--------------------------------------------------------------------------
        //-->  백엔드에서 불러온 데이터를 state.todo 에 셋팅하기 위해서 reducer 에 getTodo 를 추가해준 것이다 (전역상태관리 추가해준 것)
        //-->  이제 msw 로 백엔드에서 데이터를 불러와 list 를 보여줄 것이기에 이 reducer 가 필요한 것이다

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
    },
    //-----------------------------------------------------------------------------------
    // redux thunk :
    extraReducers: (builder) => {
        /*
            여기다가 addTodo가 성공, 실패, 대기 .. 등등 일 때 어떻게 할 것인지 전부 다 정의할 것이다
            -->  아래 있는 createAsyncThunk 이 함수가 결과값을 반환하기 전까지는 자동으로 pending 이 실행된다
            -->  return 한 결과값이 있으면 자동으로 fulfilled 가 실행된다
            -->  에러가 나면 자동으로 reject 가 실행된다
            ==>  dispatch 를 따로 보내지 않아도 다 자동으로 되는 것이다
        */
        builder.addCase(addTodo.pending, (state, action) => {
            // 위에 initialState 에 있는 addTodoState 이다
            state.addTodoState.loading = true //-->  대기상태  -->  즉, 로딩중이기에 loading 을 true 로 바꿔준 것이다
            state.addTodoState.done = false //--> 초기화하려고 넣은 것
            state.addTodoState.error = null //--> 초기화하려고 넣은 것 (요청할 때 다시 초기화하려고 넣은 것  -->  기본값)
        })

        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.addTodoState.loading = false //-->  로딩은 이제 할 필요 없으니 false
            state.addTodoState.done = true //-->  요청이 끝났기 때문에 true
            state.todo.unshift(action.payload) //--> 아래에 적었던 response.data 가 자동으로 action 의 payload 로 가는 것이다
        })

        builder.addCase(addTodo.rejected, (state, action) => {
            state.addTodoState.loading = false
            state.addTodoState.done = true
            state.addTodoState.error = action.payload //--> 실패한 에러내용이 자동으로 action.payload 로 가는 것이다  -->  error === action.payload
            //-->  catch 했을 때 생기는 에러의 메세지가 자동으로 payload 로 이동하는 것이다
        })
    },
    //-----------------------------------------------------------------------------------
})

export const {deleteTodo, updateTodo, getTodos } = todoSlice.actions  //==>  addTodo 필요 없어서 지워줬다 (action 으로 가지 않고)
//-->  getTodos 새로 만들었으니 추가해줬다
// export const { getTodos } = todoSlice.actions
export default todoSlice.reducer

//-------------------------------------------------------------------------------------------------------------------------------------------------------
// createAsyncThunk 사용해준 것 :

//-->  겹치지 않게 만들어줘야한다 (고유한 키값이 되는 것이다)  -->  switch 에 들어가는 action.type 명이 된느 것이다
export const addTodo = createAsyncThunk('todo/addTodo', async({title, content}) => {
    const result = await fetch("/api/todo", {
        method: "post",
        body: JSON.stringify({
            title,
            content
        })
    })
    const response = await result.json()
    return response.data  //-->  이 친구가 success 한 것이다  -->  자동으로 addTodo 의 success 한 곳으로 dispatch 로 전송이 되는 것이다  -->  return payload
    //-->  즉, dispatch( addTodo( response.data ) ) 가 되는 것이다  -->  자동으로 해주는 것이다
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------