import { http, HttpResponse } from "msw";

/*
    get / post 차이점 :

    get : body 데이터 전달이 안된다  -->  "주소" 로만 전달할 수 있다
    post : 모두 전달할 수 있다  -->  body 안에 있는 내용물로도 되고, 주소로도 전달할 수 있다 (post 는 만능이다)
                                                        주소로도 데이터를 넣을 수 있고, 안에 body 로도 데이터를 넣을 수 있다
                                                        post 는 택배 안에 데이터를 실어서 전송하는 것이다
*/

// 여기 안에 작성하는 모든 코드는 백엔드 개발자들이 해야하는 역할들이다  -->  로그인 요청을 post 로 할지 get 으로 할지는 백엔드가 정하는 것이다
// 백엔드도 주소가 있다  -->  React 에서는 RouteProvider 로 주소 연결을 했다면, 백엔드에서는 이 post 안에 적어주면 되는 것이다  -->  post("/api/user/login")

// 이 post 안에 주소를 적어주면  -->  이 주소에 데이터를 보내면 여기에 전달된다는 의미이다 (주소를 정해주는 것은  -->  백엔드의 이름을 지어준 것이다)
// "/api/user/login" 이라는 주소에 post 로 데이터를 보내면, 조건에 따라 백엔드가 알림창을 띄우는 데이터를 전송하거나, 통과되어 로그인 되는 것이다
//-->  즉, 프론트가 request 보내야하는 주소를 만들어준 것이다  -->  백엔드는 이 request 받은 값으로 response 값을 만들어서 프론트에게 전달해주는 것이다

//==>  즉, 주소설정도 백엔드가 정하는 것이고, 메소드도 백엔드가 정하는 것이다 (여기서 매소드는 post 이다)
//==>  post 로 "/api/user/login" 이라고 백엔드 주소, 즉, 이름을 정해준 것이다  -->  프론트엔드가 여기에 데이터를 보내면 로그인이 되는 것이다 (fetch , axios ... )

// 여기서 매개변수 request 는 http 안에 자동으로 내장되어 있는 것이고, 사용자가 보낸 요청이, 이 request 매개변수 안에 담기는 것이다 (req 와 res 데이터가 오고 가는 것이다)
//-->  로그인 부분이라면, 아이디나 비밀번호가 담기는 것이다 (사용자가 요청을 했을 때 발생하는 것)

//-->  프론트에서는, post 라고 메소드 정해주고, body 데이터로 로그인에 관한 정보들 (email, password ... 등등) 보내주면 되는 것이다
//-->  그리고 백엔드에서는 이 데이터를 req 매개변수로 받는데, body 데이터
//-->  즉, 객체형태로 보냈기에 const {email, password} = await request.json() 하면 프론트에서 보내준 데이터를 사용할 수 있는 것이다

export const login = http.post("/api/user/login", async ({ request }) => {
    // 로그인 기능이기에 주소로 데이터를 보내면 안된다  -->  하지만, 일단 주소로 데이터 보내는 방법을 공부해보고 넘어갈 것이다
    //-->  로그인 데이터는 "주소" 로 전송하면 안된다 / "body" 데이터로 전송해야한다 (body 데이터는 암호화된 값으로 전달이 된다)

    // 백엔드에게 "주소" 로 데이터를 보내는 방법은 queryString 과 params 가 있었다
    // queryString  -->  /todo?todoId=2&userId=2
    // params  -->  todo/3  -->  (/todo/:todoId)
    //==>  즉, 데이터를 보낼 때는 axios.post("/todo?todoId=2&userId=2") 이런식으로 보내면 된다

    // URL 로 데이터를 가져오는 방법 :
    const url = new URL(request.url)
    const { todoId, userId } = url //--> 이렇게 하면 데이터가 전송이 되는 것이다
    console.log(todoId, userId) // 2, 2 가 나온다
    /*
        params 로 데이터를 가져오는 방법 :
        "/api/user/login/:todoId"
        const { todoId } = request.params
    */
   // request.url , request.json ...  -->  콘솔 찍으면 어떤 값이 나올까?

    //-------------------------------------------------------------------------------------------------------------------------------------------

    // 이제 실제로 사용자가 백엔드에게 request 를 보내게 될 것이다  -->  이때 필요한 사용자가 보내는 데이터는 "email" 과 "password" 이다
    // 이제 백엔드는 요청을 받았으니까, 이 request 에서 email 과 password 를 빼오기만 하면 되는 것이다
    //==>  하지만, email 과 password 는 주소로 데이터를 보내면 안되기 때문에, 이제 데이터를 "body" 에 실어서 보내는 방법을 해볼 것이다
    const { email, password } = await request.json() //-->  이렇게 하면 데이터를 받아올 수 있다 (await 무조건 붙여줘야 한다)
    //-->  body 데이터로 보냈기 때문에 객체형태이다, 즉 객체형태인 string 을 json() 으로 객체로 바꿔주고, 객체구조분해할당 해서 데이터 사용해주면 되는 것이다

    // 실제 백엔드였다면, "DataBase" 라는 데이터 저장소가 있다
    //==>  이 데이터 베이스에서 이 email 과 password 가 일치하는 사람을 찾아서, 그 찾은 사람의 정보나, 맞는 응답 값을 전달한다
    //==>  하지만, 여기서는 Mocking 한 것이기에 DataBase 라는 저장소가 없다 (지금 하고 있는 것은 가짜로 백엔드 API 를 만든 것이다)
    //==>  그래서 아래 작성할 요직들도 가짜로 작성할 것이다 (목데이터로 작성할 것이다)
    // ex) 백엔드가 프론트한테 이메일과 비밀번호를 받으면, 데이터에서 찾아서 맞는지, 맞지 않는지 검색하는 거겠구나  -->  이것 가짜로 작성할 거다

    // email 과 password 를 찾았는데, 일치하는 계정이 없을 때를 가상으로 구현한 것이다 (조건문으로 에러처리 해준 것이다  -->  res 로 status: 400 을 전달해준다)
    if(email !== "test@test.com" || password !== "testtest") return new HttpResponse(null, {
        //-->  HttpResponse 여기서 json 형태의 가짜 데이터  -->  즉, mock 데이터를 여기서 만들고 보내주는 것이다
        
        status: 400, //--> http response status code 이다
        // 400 번은 bad request 이다  -->  사용자가 데이터를 잘못 입력했을 때이다

        // statusText: "아이디 혹은 비밀번호를 확인해주세요", //--> 이거 잘 안돼서 주석처리 해놓은 것
    })

    // 로그인에서 성공했을 때, 백엔드에서는 출입증(신분증) 응답값을 줘야한다  -->  여기 로그인한 사람이다라는 출입증 (암호화된 값) 을 받아야한다 (백엔드가 주는 것)
    //==>  이 암호화된 값을 프론트엔드는 저장할 필요가 있다
    return HttpResponse.json({
        token: "token", //-->  지금은 일단 token 이라고 적었지만, 원래는 실제 사용자들의 고유한 값을 넣어야한다 (사용자들의 고유 값을 전달해주는 것) (암호화된 값)
        status: 200, //-->  성공 (사용자가 데이터를 잘 입력했을 때이다)
        //==>  백엔드는 이렇게 로그인 성공하면 토큰을 주고, 프론트엔드는 useNavigate 로 화면을 이동시킨다
    })

    // 이렇게 모두 마쳤으면, /api/user/login 이라는 Mocking 을 만들어낸 것이다 (가상 데이터)
    //-->  회원가입은 실제로 우리가 DB (Data Base) 가 없기 때문에 진행하진 않고, 로그인만 만들어볼 것이다  -->  로그인이 끝나면 todo 페이지도 만들어보자
    
    // Mocking : 실제 서버와의 통신 없이 네트워크 요청을 가로채고 "가짜 데이터" 를 반환하는 것이다
    //-->  이를 통해 프론트엔드는 실제 서버가 준비되지 않았거나, 서버와의 통신이 불안정한 상황에서도 프론트엔드 애플리케이션을 개발하고 테스트할 수 있다
})
