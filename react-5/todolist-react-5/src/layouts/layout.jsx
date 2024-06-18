import { Outlet, useLocation } from "react-router-dom"
import { dynamicLayoutMetadata } from "../_utils/url-helper"

//----------------------------------------------------------------------------------------------------------------------------------------------
//====>  metadata.js 와 url-helper.js 에 모듈화 해줘서 주석처리 해준 것 (삭제해도 된다)

// const LAYOUT_METADATA = {
//     "/": {
//         header: true,
//         footer: true,
//     },
//     "/todo": {
//         header: false,
//         footer: true,
//     }
// }

// function dynamicLayoutMetadata(pathName) {
//     // return LAYOUT_METADATA[pathName]  //-->  위 객체의 pathName 키값을 반환해줄 것이다 --> pathName이 "/" , "/todo" 아냐에 따라 달라진다
//     //-->  ("/" or "/todo") 와 같은 문자열이 들어가면 객체의 "닷 접근법" 이 안되기 때문에, "대괄호 접근법" 을 사용한 것이다

//     console.log(pathName.split("/")) // ['', 'todo', '3'] 인 배열이 온다  -->  1번째 인덱스(todo) 를 가져오고, "/" 를 붙여주면 된다
//     // return LAYOUT_METADATA["/" + pathName.split("/")[1]] // "/" or "/todo"

//     // " " , "todo" , "3"  -->  0, 1 에 있는 데이터를 가져와서 join("/") 로 연결  -->  "/todo"
//     const basePath = pathName.split("/").slice(0, 2).join("/")
//     return LAYOUT_METADATA[basePath] // "/" or "/todo"

//     //==> 위의 연산이랑, 아래의 basePath 랑 똑같은 말이다
//     // 이렇게 특수한 주소에 따라 연산이 필요한 경우가 있다

//     //==>  이제 우리가 metadata (페이지에 따라 헤더, 풋터에 true / false) 가 있기 때문에 컴포넌트 보여줄 때 조건을 넣을 수 있게된다
//     // 아래 컴포넌트로 가서 조건을 넣어주자
// }

//----------------------------------------------------------------------------------------------------------------------------------------------

const RootLayout = () => {

    const location = useLocation()  // react-router-dom 에서 지원하는 함수
    // useLocation() 은 현재 위치한 주소를 가지고올 수 있는 함수

    // console.log(location) //-->  콘솔 찍어보면, 객체에서 pathname 에 주소값("/" or "/todo") 이 들어가있는 것을 확인 가능하다
    // console.log(location.pathname) // "/" or "/todo/~"

    const metadata = dynamicLayoutMetadata(location.pathname)
    //-->  내가 필요한 건 "/todo" 인데, "/todo/3(뒤에 뭐가 붙음)" 가 와버린다  -->  split 을 하거나, slice 를 해서 쪼개거나 없애줘야 한다
    //-->  위의 dynamicLayoutMetadata 함수에서 매개변수로 받은 pathname 을 쪼개고, "LAYOUT_METADATA" 배열의 키로 접근해서 객체의 값을 반환시켜보자

    // console.log(metadata)
    //--> Main 페이지면 {header: true, footer: true} , Todo 페이지면 {header: false, footer: true}


    // Outlet : react-router-dom 에서 만든 것이다

    // 이 RootLayout 컴포넌트를 이제 우리가 만들었던 router.js 를 감싸게 만들어줄 것이다  -->  현재 주소에 맞는 친구를 Outlet 에다가 랜더링 하는 것이다
    // <RootLayout> path , element </RootLayout>
    //-->  이렇게 감싸면 하위에 있는 router.js 중 "주소에 맞는" 요소를 RootLayout 에 전달하여 그대로 보여주는 역할을 한다
    //-->  상위 컴포넌트를 만들고, 주소에 맞는 하위 컴포넌트들을 전달하는 역할

    //==>  레이아웃을 만들기 위해 상위 컴포넌트를 만들었고, 상위컴포넌트를 전달해주는 "Outlet" 이라는 친구를 사용해주는 것이다

    // Outlet : 전달체이다  -->  ex) 주소가 todo네? 그럼 todo 를 찾아서 RootLayout 에서 보여줘야지
    // ex) 주소가 todo 면, 우리가 매칭했던 친구를 여기 (헤더와 푸터 사이) 로 가져오는 역할

    //----------------------------------------------------------------------------------------------------------------------------------------------

    return <>
        {metadata.header && <header>header</header>} {/*--> metadata 의 헤더가 true 이면 <header/> 보여줘라*/}
        <Outlet/> {/*--> 이렇게 Outlet 라고 import 받고 적어주면 된다*/}
        {/*
            <RootLayout/> 자식 중에 경로(path) 에 맞는 컴포넌트를 보여주는 것이다
            경로가 맞는 자식 컴포넌트를 <RootLayout/> 의 <Outlet/> 으로 보여주는 것이다
        */}
        
        {/*
            --> "/" : <Main/>
            --> "/todo" : <Todo/>
            이렇게 주소에 따라서 컴포넌트를 가지고 오는 역할을 하는 것이다
        */}

        {/*
            이 header, footer 안에는 <Main/> 이나 <Todo/> 컴포넌트가 와야 헤더, 풋터 사이에 있는 바디 내용이 채워지는 것이다
            그럼 이제 header , footer 는 고정되어야 하는 부분이고, 이 바디 부분이 유동적으로 바뀌어야 하는 부분이다
            ==>  이렇게 동적으로 바꿀 수 있는 Outlet 이라는 기능을 사용할 것이다
        */}
        {metadata.footer && <footer>footer</footer>} {/*--> metadata 의 풋터가 true 이면 <footer/> 보여줘라*/}
    </>
}
export default RootLayout