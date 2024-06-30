
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom"; //--> 여기선 { RouterProvider } 필요 없어서 지워준 것 --> RouterProvider 는 "App.js" 에서 작성해줬다

// RouterProvider --> 주소를 "감지" 하는 역할 (주소를 감지해서 나한테 주소가 무엇이다 하고 알려주는 역할)
// createBrowserRouter --> 주소에 따라서 어떤 애들을 매칭할지 route 를 "생성" 하는 역할

// URL 을 감지하여 내가 생성한 route 주소에 맞게 컴포넌트를 전달하는 역할을 한다 ( "감지" 하고 "생성" 해야한다 )

//-----------------------------------------------------------------------------------------

// 여기는 Main, Todo 컴포넌트 만들어준 후 과정
import Main from "../../pages/main/main"; //--> 밑에 컴포넌트를 자동완성 시켜주면 자동으로 이렇게 상단에 import 되는 것을 확인할 수 있다
import Todo from "../../pages/todo/todo"; //--> 컴포넌트 앞에다가 export 를 붙여줬기 때문에 { 중괄호 } 안에 컴포넌트 명이 오는 것을 확인할 수 있다
import RootLayout from "../../layouts/layout";
//--> 공식문서의 사용법을 그대로 복붙해온 것

//==>  컴포넌트 앞에서 추출해준 것만 반드시 import 할때 { 중괄호 } 안에 써야한다 (중괄호 안에 안쓰면 오류남, default 로 추출해준 것 중괄호 안에 써도 오류남)

//-----------------------------------------------------------------------------------------

// 아래 createBrowserRouter 함수를 보면 path 로 루트를 "생성" 해주는 역할임을 확인할 수 있다
const router = createBrowserRouter([
    {
        // path: "/",
        // element: <Main />
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Main/>  //-->  이러면 <RootLayout/> 의 자식으로 <Main/> 이 들어간다
                //-->  경로(path) 가 맞는 친구를 <RootLayout /> 의 <Outlet/> 으로 보내는 것이다 ("/" 이면 Main 을 보내고, "/todo" 이면 Todo 를 보낸다)
            },
            {
                path: "/todo/:todoId",
                element: <Todo />
            }
        ]
    },
    
    //------------------------------------------------------------------------------------------------------------------------------------------------------
    //  day07 수업에서 "Outlet" 적용시키면서 주석처리 해놓은 router 기능이다 (레이아웃 header, footer 고정시켜주기 위함)
    // {
    //     path: "/todo/:todoId",
    //     //--> 이제 그냥 /todo 하면 투두페이지가 뜨지 않는다  -->  /todo/아무거나입력  -->  이렇게 해줘야 투두 페이지가 뜬다 (입력한 값은 todo의 고유한 id 값이 된다)
    //     // path 를 변경시켜줬으면 todo.jsx 파일로 이동해보자
    //     element: <Todo />
    //     //==> 이렇게 모두 마쳤다면 day02 수업 종료 *** (마지막 경로 이동 : todo.jsx => router.js)
    // }
    //------------------------------------------------------------------------------------------------------------------------------------------------------
    
])
//--> 공식문서의 사용법을 확인하면 된다

export default router  //-->  기본 값(default)이 router 라고 내가 정해놨기 때문에, import 할 때 내가 원하는 이름으로 설정해줄 수 있는 것이다
//--> 이렇게 하면 import 하고 가지고 올 이름을 내가 마음대로 설정할 수 있다  -->  ex) import junseok from "./routes/router"  -->  이러면 router가 온다
// 사용법 : import 가지고 올 이름 from "상대경로"

// 만약 이렇게 밑에 export default 가 아닌 상단에 export const router = ... 이런식으로 export 해줘도 된다
// 사용법: import { 가지고 올 이름 } from "상대경로"  -->  이름을 똑같이 해야하고, {중괄호} 안에 작성해야한다

//==> export 할 것이 여러 개 있다면 상단에서 추출해주는 export const router = ... 이 방법을 많이 쓴다

//-----------------------------------------------------------------------------------------

// 1. 모두 마쳤다면, App.js 파일로 이동

//-----------------------------------------------------------------------------------------

// 2. 이렇게 모두 마쳤다면 day02 수업 끝 (마지막 경로 이동 : todo.jsx => router.js)