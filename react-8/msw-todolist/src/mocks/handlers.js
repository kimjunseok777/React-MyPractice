import * as UserApi from "./apis/user.api"  //-->  Mock 데이터가 있는 login 받아온 것이다
// 이렇게 import 받으면 객체형태로 export 되어 있는 것들을 다 가져온다
// 그렇기에 { login : function } 이렇게 사용할 것이다  -->  export 된 login 으로 value 인 function 만 가져올 것이다

import * as TodoApi from "./apis/todo.api"
// "./apis/todo.api" 에서 export 된 것들 전부다 TodoApi 이름으로 import 받아온 것이다


// 작성하기 전에 msw 공식문서 확인해보자 **  -->  모두 삭제하고 UserApi 로 바꿔줬다
// 이 handlers 배열 안에 가상의 api 들을 넣을 것이다
// export 되어 있는 login 의 value 인 function 만 handlers 배열에 넣어준 것이다 (객체의 값만 가져온 것이다)
export const handlers = [...Object.values(UserApi), ...Object.values(TodoApi)]
//-->  이렇게 하면 handlers 에 자동으로 등록 된 것이기에 사용하면 된다

//==>  UserApi : 백엔드 주소와 메소드, 조건에 따라 백엔드에서 전달해주는 데이터가 들어있다
//==>  여기서 export 해준 handlers (--> 백엔드주소와 목데이터가 있다) 는 server.js 의 "setupWorker" 에서 사용된다


/*

    export const handlers = [
        http.post("/todo/3", () => {
            return HttpResponse.json({
                id: 1,
                title: "title-1",
                content: "content-1",
                state: false
            })
        })
    ]

*/