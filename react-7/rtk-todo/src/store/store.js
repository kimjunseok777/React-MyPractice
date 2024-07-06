import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "./todo.slice" //-->  이름 마음대로 import 받을 수 있는 것이다  -->  export default todoSlice.reducer
import logger from "redux-logger"


// 공식문서 확인하고, configureStore 만들어주자 (공식문서와 똑같이 만들었다)
// 이 store 를 App.js 에 만든 Provider 의 store 에 넣어주자
export const store = configureStore({
    reducer: {
        todo: todoReducer, //--> key 도 마음대로 작성해주는데, 겹치지 않게 주의해야한다 (내가 등록하고 싶은 key 로 등록해주면 되는 것이다)
        //-->  todoReducer 를 import 받고, "todo(내 맘대로 작성)" 라는 이름으로 등록시켜준 것이다
    },
    //-----------------------------------------------------------------------------------------------------------------------------------

    devTools: process.env.NODE_ENV !== "production", //-->  현재 "development" 이기에 devtools 모드는 켜진 것이다
    /*
        process.env.NODE_ENV :
            
        env 는 "환경변수" 를 의미한다  -->  환경변수 : 코드의 동작에 영향을 미치는 변수, 동적으로 변경하는 값이다 (시스템 환경에 따라 값이 변경될 수 있다는 의미이다)
                                                          -->  일반변수는 선언할 때 "코드" 안에다가 선언하지만, 환경변수는 "컴퓨터" 에다가 선언하는 변수이다

        * 실제로 사용자들에게 배포하는 것은 bundle 된 코드이다  -->  "npm run build" 를 해서 나온 결과물을 배포한다
        ==>  이 결과물일때는 "NODE_ENV" 의 값이 "production" 이다  -->  즉 NODE_ENV = "production" 이라고 보면 된다 (사용자가 실제로 사용하는 환경은 production 이다)
            
        * 하지만 우리가 개발을 하고 있을 때는 "npm start" 로 실행을 한다
        ==>  이렇게 개발을 하고 있을 때는 NODE_ENV 가 "development" 이다  -->  즉, NODE_ENV = "development" 이라고 보면 된다 (개발 환경)

        devtools 는 개발자 도구이다  -->  즉, 실제 사용자들이 보는 production 모드일 때는 이 devtools 가 활성화 되면 안된다
        ==>  즉, NODE_ENV !== "production" 를 해석해보면  -->  사용자모드가 아닐 때 devtools 를 킨다는 의미이다
    */

    //-----------------------------------------------------------------------------------------------------------------------------------

    // 공식문서 보고 따라 쓴 것이다  -->  getDefaultMiddleware 는 RTK 에 설치되어있는 기본적인 미들웨어이다
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), //-->  기존에 있는 미들웨어에 "logger" 를 합친 것이다

    //==>  여기서 logger 는 "npm i redux-logger" 로 설치하고, import 받아온 것이다

    // rtk 는 이미 다양한 미들웨어가 설치된 상태이다  -->  따라서 기존에 있는 미들웨어에 로거라는 기능을 합치기 위해 concat 을 사용한다
    // getDefaultMiddleware  -->  rtk 의 기존 미들웨어를 가지고 오는 함수이다  -->  즉, 추가를 하려면 기존에 있는 미들웨어랑 합쳐야한다는 뜻이다  -->  concat 을 사용하면 된다
})