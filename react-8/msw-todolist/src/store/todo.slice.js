import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    todo: [], //-->  이제 투두리스트의 기본값도 백엔드에서 받아와서 사용할 것이기에 빈배열로 만들어준 것이다

    // redux thunk :
    //-->  작성하는 slice 로직 이거로 바꿔서 만들어준 것이다  -->  성공하면 todo 배열에 요소가 추가되는 것은 똑같다
    // (로딩과 실패 로직을 추가시켜눈 것  -->  사용자에게 상황에 따라 다양한 UI 를 보여줄 수 있다)
    addTodoState: {
        loading: false, //--> 아무것도 요청이 안 올 때는 로딩이 false 인 상태이다 (로딩중인지, 아닌지를 나타낸다)
        done: false, //-->  done 은 요청이 성공이든 실패든 상관없이 action 이 끝났는지, 끝나지 않았는지를 확인하는 친구이다 (실행이 끝났으면 true 이다)
        error: null, //-->  에러가 없으면 null 로 비워져있고, 에러가 있다면 에러메세지가 들어간다
    }
    /*
        투두가 요청중이라면 : loading 을 true 로 바꿔야한다  -->  전역상태이기에 dispatch 해야한다  -->  done, error 는 기본값 그대로 놔두고, loading 을 true 로 바꿔줘야한다
        투두가 성공했다면 : loading 은 false 로 바꾸고, done 은 true 로 바꿔줘야한다, todo 배열에는 값 채워줘야한다  -->  [...state, newTodo]  -->  dispatch
        투두가 실패했다면 : loading 은 false 로 바꾸고, done 은 true 로 바꿔줘야한다, error 에 메세지를 넣어야한다  -->  error.message  -->  dispatch

        ==>  원래라면 dispatch 3번이나 해야한다  -->  이렇게 dispatch 를 여러번 하게 redux 가 만들었을까? (contextApi 사용했다면 진짜로 dispatch 3번 다 해야한다)
        ==>  redux 의 thunk 를 사용하면 3번 다 하지 않아도, 얘네들이 알아서 에러메세지나 로딩중 등등 dispatch 를 요청해준다
        ==>  redux thunk 사용 안했다면 : 로딩중 한번, 실패 한번, 성공 한번  -->  이렇게 dispatch 3번 해야 한다

        ==>  백엔드에서 요청했을 때 변화하는 다양한 상태값을 쉽게하기 위해서 사용하는 것이 redux thunk 이다

        아래에 createAsyncThunk 만들어주고, reducers 가 아닌 extraReducers 새로 만들어주자 (addTodo 만 redux thunk 로 바꿔볼 것이다)
    */
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        //--------------------------------------------------------------------------
        // 작성 :

        // addTodo: (state, action) => {
        //     state.todo.push(action.payload)
        // },

        //==>  extraReducers 로 사용해주기위해 addTodo 빼줬다

        //--------------------------------------------------------------------------
        // 조회 :
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
            //-->  백엔드에서 오는 데이터인 data 배열에 id, title, content, state 모두 있기에, 이 응답받은 data 배열 자체를 payload 에 넣어주면 조회가 되는 것이다
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
            여기다가 addTodo가 성공, 실패, 대기 ... 등등 일 때 어떻게 할 것인지 전부 다 정의할 것이다

            성공 : 투두 배열에 요소 채워짐
            실패 : 에러 메세지가 담김
            대기 : 로딩이 true 로 바뀜

            -->  아래 있는 createAsyncThunk 이 함수가 결과값을 반환하기 전까지는 자동으로 pending 이 실행된다
            -->  return 한 결과값이 있으면 자동으로 fulfilled 가 실행된다
            -->  에러가 나면 자동으로 reject 가 실행된다
            ==>  dispatch 를 따로 보내지 않아도 다 자동으로 되는 것이다
        */
        builder.addCase(addTodo.pending, (state, action) => {
            // 위에 initialState 에 있는 addTodoState 이다
            //-->  대기 상태일 때는 따로 action 객체 데이터 받을 필요 없기에 매개변수 action 지워줘도 된다
            state.addTodoState.loading = true //-->  대기상태  -->  즉, 로딩중이기에 loading 을 true 로 바꿔준 것이다
            state.addTodoState.done = false //--> 초기화하려고 넣은 것
            state.addTodoState.error = null //--> 초기화하려고 넣은 것 (요청할 때 다시 초기화하려고 넣은 것  -->  기본값)
            //==>  즉, 뭔가 액션을 취하면 자동으로 로딩중 상태는 따라오는 것인데, 그때 done 과 error 가 기본값으로 초기화 되는 것이다
        })

        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.addTodoState.loading = false //-->  로딩은 이제 할 필요 없으니 false (로딩 기본값)
            state.addTodoState.done = true //-->  요청이 끝났기 때문에 true
            state.todo.unshift(action.payload) //--> 아래에 적었던 response.data 가 자동으로 action 의 payload 로 가는 것이다
            //-->  투두 배열에 내용이 작성되는 것이다
        })

        builder.addCase(addTodo.rejected, (state, action) => {
            state.addTodoState.loading = false //-->  로딩 기본값
            state.addTodoState.done = true
            state.addTodoState.error = action.payload //--> 실패한 에러내용이 자동으로 action.payload 로 가는 것이다  -->  error === action.payload
            //-->  catch 했을 때 생기는 에러의 메세지가 자동으로 payload 로 이동하는 것이다
        })
    },
    //-----------------------------------------------------------------------------------
})

export const {deleteTodo, updateTodo, getTodos } = todoSlice.actions  //==>  addTodo 필요 없어서 지워줬다 (reducers 가 아닌 extraReducers 에 새로 만들어줬다)
//-->  getTodos 새로 만들었으니 추가해줬다
// export const { getTodos } = todoSlice.actions  -->  이제 투두의 기본 데이터도 백엔드에서 받아올 것이기에 조회하는 기능 추가해준 것이다
export default todoSlice.reducer

//-------------------------------------------------------------------------------------------------------------------------------------------------------
// createAsyncThunk 사용해준 것 :

//-->  겹치지 않게 만들어줘야한다 (고유한 키값이 되는 것이다)  -->  switch 에 들어가는 action.type 명이 되는 것이다
//-->  여기서 "todo/addTodo" 이게 고유한 키값이다  -->  겹치지 않아야한다  -->  이 친구가 switch 에 들어가는 action.type 인 것이다
//-->  "todo/addTodo"  -->  로거에서 이름 기본값이 된다
export const addTodo = createAsyncThunk('todo/addTodo', async({title, content}) => {
    //-->  title, content 를 매개변수로 받고, fetch 로 데이터 요청할 때 이 매개변수 title, content 를 보내는 것이다
    const result = await fetch("/api/todo", {  //-->  todo.slice.js 에서 fetch 사용해서 백엔드에게 데이터 요청한 것이다 (작성 api 에 request 보낸 것이다)
        method: "post",
        body: JSON.stringify({
            title,
            content
        })
    })
    const response = await result.json()
    return response.data  //-->  이 친구가 success 한 것이다  -->  자동으로 addTodo 의 success 한 곳으로 dispatch 로 전송이 되는 것이다  -->  return payload
    //-->  여기 있는 response.data 가 자동으로 payload 로 가지는 것이다
    //-->  즉, dispatch( addTodo( response.data ) ) 가 되는 것이다  -->  자동으로 dispatch 까지 해주는 것이다 (return만 되면 자동으로 옮겨주는 것)
    // pending, fulfilled, reject 된 상황의 dispatch 를 자동으로 해준다  -->  ex) 만약 실패한다면, payload 에 에러메세지를 담아서 보내주는 것이다
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------
