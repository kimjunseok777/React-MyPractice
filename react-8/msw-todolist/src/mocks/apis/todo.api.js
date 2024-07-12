import { http, HttpResponse } from "msw";

// 메소드만 다르게 하면 백엔드 주소는 똑같이 설정해줘도 되는 건가?

//------------------------------------------------------------------------------------------------------------------------------
// 작성 :

// 투두를 추가한다면 백엔드에서 어떤 데이터를 줘야할까?  -->  title, content 가 포함된 객체를 줘야한다  -->  즉, input 데이터를 줘야한다
export const addTodo = http.post("/api/todo", async ({ request }) => {
    // 백엔드에게 input 에서 value 데이터를 줘야함  -->  title, content  -->  객체로 전달하기에 body 에 실어서 보내면 좋다
    //-->  백엔드에게 요청할 때 title 과 content 를 body 에 실어서 요청하는 것이다
    const { title, content } = await request.json()
    
    // 원래라면 여기에 실제로 백엔드가 Date Base 에 저장하고, 저장할 때 생긴 고유번호를 id 로 삼은 객체로 전달해야 하는 것이 맞다
    //-->  이 과정이 우리가 DataBase 가 없기 때문에 생략한 것이다 (현재 전달이 불가능하다)

    return HttpResponse.json({
        status: 200,
        data: {
            id: Math.floor(Math.random() * 1000000),
            title,
            content,
            state: false,
        } //--> 이렇게 프론트엔드에서 요청받으면, 데이터 전달하는 것이다
    })
})

//------------------------------------------------------------------------------------------------------------------------------
// 조회 :

// 여러개 불러올 거기 때문에 todos 로 해줬고, 불러오는 것이기에 "get" 이다
export const getTodos = http.get("/api/todo", async () => {
    // get 은 조회이다  -->  그럼 get 은 request 하는 부분이 무엇일까?  -->  없다, 아무것도 보내지 않아도 된다
    // 그렇다면, 만약에 내가 쓴 데이터만 불러오고 싶다면 어떻게 요청해야할까?  -->  출입증  -->  우리가 작성한 "token" 을 줘야한다 (axios 때 제대로 한다)
    //-->  token 은 자동으로 데이터에 실리기 대문에 따로 보내지 않아도 된다
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
//-->  그냥 지금까지 우리가 만들었던 투두 목데이터 적어준 것이다 (기본값 넣어준 것이다)

//------------------------------------------------------------------------------------------------------------------------------
// 수정 :

// export const updateTodo = http.patch()

/*
    프론트엔드 개발자 입장 :
        업데이트를 하기 위해 프론트엔드가 request 에 실어서 보내야하는 input 의 값은 무엇일까?
        -->  id , 변경된 값

    백엔드 개발자 입장 :
        id 를 어떻게 받아야할까?  -->  주소에도 querystring, params, body 가 있다
        -->  id 는 querystring 으로 받아오자 (user.api.js 에서 했었으니 참고하자  -->  request.url)
        -->  변경된 값은 body 에 실어서 가져오자  -->  request.json()
        -->  return { id , 변경된 값 }
*/

//------------------------------------------------------------------------------------------------------------------------------
// 삭제 :

// export const deleteTodo = http.delete()

/*
    프론트엔드 개발자 입장 :
        delete 는 보내야하는 데이터는 id 뿐이다
        -->  querystring 으로 보낼지, params 으로 보낼지는 백엔드 마음이다

    백엔드 개발자 입장 :
        id 는 params 로 받으면 된다
        -->  메소드는 delete , 주소는 "/api/todo/:todoId" 이런 식으로 해주면 된다

    ex)
    export const deleteTodo = http.delete("/api/todo/:todoId")  -->  이런식으로 하면 된다

    return { id }
*/
