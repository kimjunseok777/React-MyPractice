import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';
import { Provider } from "react-redux"  //-->  Provider 받아와서 사용해줬다
import { store } from './store/store';  //-->  Provider 덮개에 중앙관리할 데이터 넣어주기 위해 import 받아온 것 (reducer 들이 들어가있다)
import { server } from './mocks/server';
import { useEffect, useState } from 'react';

function App() {

  // server.listen() //--> msw 공식문서 보고 만들어준 것이다  -->  여기까지 하면 msw 를 사용하기 위한 기초 준비가 완료된 것이다
  //==>  이전 버전까지만 하더라도 worker.state() 였다  -->  라이브러리 사용할 때 공식문서를 잘 봐야한다 (msw 버전 2가 나온 것이다)

  // server.listen() 이거 안돼서 server.start() 로 바꿔줬다
  // if(process.env.NODE_ENV === "development") server.start() //-->  *** 아래에 있는 강제로 리랜더시키는 곳으로 옮겨줬다
  // msw 는 Mocking 으로, 즉, 가상으로 백엔드 데이터를 만드는 것이기 때문에 개발환경에서만 실행하는 것이 좋기에 작성해준 코드이다

  // server.start() : 이 코드를 최상위 컴포넌트에 작성하면, 이제 서버를 실행하여 네트워크 요청을 가로채기 시작하고, 정의된 핸들러에 따라 응답을 반환한다
  // server : setupWorker(...handlers)  -->  여기서 handlers 는 주소와 가상의 api 가 담겨있는 배열이다

  //--------------------------------------------------------------------------------------------------------------------------------
  
  // msw 도 실행하는데 시간이 걸린다
  //--> 강제로 리랜더 시키는 요직을 만들어보자


  // const [isMswInit, setIsMswInit] = useState(false)
  // useEffect(() => {

  //   async function initializeMsw() { //-->  server.start() 도 비동기이기 때문에 await 달아줘야돼서 async 함수로 만들어준 것이다
  //     if(!isMswInit && process.env.NODE_ENV === "development") {
  //       await server.start()
  //       setIsMswInit(true) //--> 강제리랜더링
  //     }
  //   }
  //   initializeMsw()
  // }, [isMswInit])
  

  //-->  여기 코드 모두 지우고, index.js 가서 작성해줬다
  //--------------------------------------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{/*-->  TodoProvider 지워주고, react-redux 에서 import 받은 Provider 로 바꿔준 것이다*/}
        {/*store 는 reducer 들을 key 로 정해서 모아놓은 configureStore 가 있는 데이터이다  -->  중앙 저장소이다*/}
        {/*--> 기본 redux 에서는  "combineReducers"  를 사용해줬지만, RTK 에서는  "configureStore"  를 사용해줬다*/}
        <RouterProvider router={router} />
        {/*경로에 따라 보여주는 컴포넌트를 다르게 하는 react-router-dom 라이브러리이다*/}
      </Provider>
    </ThemeProvider>
  );
}

export default App;
