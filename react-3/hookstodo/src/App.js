// import logo from './logo.svg'; //--> 원래 기본으로 있던 create-react-app 의 기본 페이지 로고 가져오는 거라 주석 처리 해준 것 (삭제해줘도 됨)
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"  //-->  export default 로 추출해줬기에 이름 마음대로 설정 가능한 것을 확인 가능
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';

function App() {
  return (
    //--> theme 은 디자인토큰 객체화 한 것 import 해서 속성의 value 로 넣어준 것이다
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />  {/*주소를 감지하는 역할인 "RouterProvider" 에 route를 생성하는 역할인 "createBrowserRouter" 를 넣어준 것을 확인 가능하다*/}
    </ThemeProvider>
    //--> router 공식 문서가서 사용법을 같이 확인
    //--> const router = createBrowserRouter( [ { },{ }, ... ] )  -->  route 를 생성한 것을 RouterProvider 의 속성 값으로 넣어준 것이다
  );
}

export default App;  //-->  index.js 로 가면 App 컴포넌트가 랜더링되고 있는 것을 확인 가능하다  -->  즉, App 컴포넌트가 실제 브라우저에 랜더링 되는 것이다
// 이제 npm start 해주면 된다

//==> 브라우저 창에 처음 주소에 router.js 파일의 path 에 작성해줬던 것처럼 /todo 를 적어주게 되면 페이지가 이동하는 것을 확인할 수 있다
// path(명사) : 길, 경로, 방향향

//==> "/todo" 라고 하는 것이 감지되면 todo 페이지를 보여줘 , "/" 처럼 아무것도 감지되지 않으면 메인 페이지를 보여줘


//----------------------------------------------------------------------------------------------------------------------------------------------------------------


// 모두 마쳤으면 이제 웹 내 페이지 컴포넌트를 만들면 된다

//--> pages 새 폴더를 만들어주자  -->  main 에 main.jsx 와 todo 에 todo.jsx 생성해주자  -->  모두 마쳤다면 파일 이동 해주자