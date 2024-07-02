import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "./todo.slice" //-->  이름 마음대로 import 받을 수 있는 것이다


// 공식문서 확인하고, configureStore 만들어주자 (공식문서와 똑같이 만들었다)
// 이 store 를 App.js 에 만든 Provider 의 store 에 넣어주자
export const store = configureStore({
    reducer: {
        todo: todoReducer, //--> key 도 마음대로 작성해주는데, 겹치지 않게 주의해야한다
    },
})