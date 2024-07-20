import { http, HttpResponse } from "msw";

// 메소드만 다르게 하면 백엔드 주소는 똑같이 설정해줘도 되는 건가?

//------------------------------------------------------------------------------------------------------------------------------
// 작성 :

// 투두를 추가한다면 백엔드에서 어떤 데이터를 줘야할까?  -->  title, content 가 포함된 객체를 줘야한다  -->  즉, input 데이터를 줘야한다
export const addTodo = http.post("/api/todo", async ({ request }) => {
    // 백엔드에게 input 에서의 value 데이터를 줘야함  -->  title, content  -->  객체로 전달하기에 body 에 실어서 보내면 좋다
    //-->  백엔드에게 요청할 때 title 과 content 를 body 에 실어서 요청하는 것이다  -->  request 매개변수에 title, content 가 전달된다
    const { title, content } = await request.json()
    
    // 원래라면 여기에 실제로 백엔드가 Date Base 에 저장하고, 저장할 때 생긴 고유번호를 id 로 삼은 객체로 전달해야 하는 것이 맞다
    //-->  이 과정이 우리가 DataBase 가 없기 때문에 생략한 것이다 (현재 전달이 불가능하다)

    return HttpResponse.json({
        status: 200,
        data: {
            id: Math.floor(Math.random() * 1000000),
            title, //--> request 매개변수로 전달받아야하는 값이다
            content, //--> request 매개변수로 전달받아야하는 값이다
            state: false,
        } //--> 이렇게 프론트엔드에서 요청받으면, 데이터 전달하는 것이다
        //-->  프론트는 이 데이터를 response 로 받아서 json 으로 바꿔준 후에 dispatch 로 넣어주면 되는 것이다
    })
})

//------------------------------------------------------------------------------------------------------------------------------
// 조회 :

// 여러개 불러올 거기 때문에 todos 로 해줬고, 불러오는 것이기에 "get" 이다
export const getTodos = http.get("/api/todo", async () => {
    // get 은 조회이다  -->  그럼 get 은 request 하는 부분이 무엇일까?  -->  없다, 아무것도 보내지 않아도 된다 (프론트엔드가 아무 데이터 없이 요청만 하면 된다)
    // 그렇다면, 만약에 내가 쓴 데이터만 불러오고 싶다면 어떻게 요청해야할까?  -->  출입증  -->  우리가 작성한 "token" 을 줘야한다 (axios 때 제대로 한다)
    //-->  token 은 자동으로 데이터에 실리기 때문에 따로 보내지 않아도 된다
    //-->  token 주는 방법은 다음에 배운다

    return HttpResponse.json({
        status: 200,
        data: [
            {
                id: 1,
                title: "title-1",
                content: "content-1",
                state: true,
            },
            {
                id: 2,
                title: "title-2",
                content: "content-2",
                state: false,
            },
        ]
    })
})
//-->  그냥 지금까지 우리가 만들었던 투두 목데이터 적어준 것이다 (투두리스트 기본값 만들어준 것이다 것이다)

//------------------------------------------------------------------------------------------------------------------------------
// 수정 :

export const updateTodo = http.patch("/api/todo", async({request}) => {
    // querystring 으로 데이터를 받을 것이다  -->  ex) api/todo?todoId=3
    // 공식문서 보고 따라할 것이다
    const url = new URL(request.url)
    const todoId = url.searchParams.get('todoId')

    // 값이 올 때까지 기다리기 위해서 await 을 걸어주는 것이다
    const {title, content} = await request.json() //--> body 데이터로 받는다 (title, content 객체 구조분해할당으로 빼낸 것이다)
    //-->  await 을 달아주는 이유는 json() 도 Promise(비동기) 이기 때문에 await 또는 then 을 달아주지 않으면 밑에 있는 return 문이 먼저 실행해버린다
    // 비동기와 비동기처리를 잘 구분해야한다  -->  await 을 걸어주지 않으면, 밑에 있는 title 과 content 에 제대로된 값이 오지 않는다 (아마 Promise pending 걸려 있을 것이다)

    return HttpResponse.json({
        todoId,
        title,
        content
    })
})



//------------------------------------------------------------------------------------------------------------------------------
// 삭제 :

export const deleteTodo = http.delete("/api/todo/:todoId", ({params}) => {
    // body 데이터를 받을 때만 async 하고 await 달아주기 때문에, delete 는 body 데이터 필요 없기에 async 안 써준 것
    const {todoId} = params  //-->  이제 params 에 투두 아이디가 들어가 있는 것이다
    //-->  원래라면 DateBase 에 접근해서 실제로 데이터를 삭제하는 sql 넣어야한다 (거기서 return 할때 삭제된 투두의 id 를 가져올 수 있는 것이다)

    return HttpResponse.json({
        status: 200,
        body: {
            id: parseInt(todoId) //--> id 의 값이 number 가 아닌 string 형태로 오기 때문에 parseInt 로 감싸준 것이다
        }
    })
})

// 삭제를 하기 위해서 필요한 값은, 그 투두의 고유한 값이다  -->  즉, 삭제할 투두의 id 가 필요하다
//-->  파라미터로 고유한 값을 전송해주자
