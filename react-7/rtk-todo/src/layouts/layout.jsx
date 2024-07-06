import { Outlet, useLocation } from "react-router-dom"
import { dynamicLayoutMetadata } from "../_utils/url-helper"


const RootLayout = () => {

    const location = useLocation()

    const metadata = dynamicLayoutMetadata(location.pathname)

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