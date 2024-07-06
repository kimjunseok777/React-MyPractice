import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';
import {Provider} from "react-redux"  //-->  Provider 받아와서 사용해줬다
import { store } from './store/store';  //-->  Provider 덮개에 중앙관리할 데이터 넣어주기 위해 import 받아온 것 (reducer 들이 들어가있다)
import { server } from './mocks/server';

function App() {

  // server.listen() //--> msw 공식문서 보고 만들어준 것이다  -->  여기까지 하면 msw 를 사용하기 위한 기초 준비가 완료된 것이다
  //==>  이전 버전까지만 하더라도 worker.state() 였다  -->  라이브러리 사용할 때 공식문서를 잘 봐야한다 (msw 버전 2가 나온 것이다)
  // server.listen() 이거 안돼서 밑에 것으로 바꿔줬다
  if(process.env.NODE_ENV === "development") server.start()
  // msw 는 Mocking 으로, 즉, 가상으로 백엔드 데이터를 만드는 것이기 때문에 개발환경에서만 실행하는 것이 좋기에 작성해준 코드이다

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{/*-->  TodoProvider 지워주고, react-redux 에서 import 받은 Provider 로 바꿔준 것이다*/}
        {/*store 는 reducer 들을 key 로 정해서 모아놓은 configureStore 가 있는 데이터이다  -->  중앙 저장소이다*/}
        {/*--> 기본 redux 에서는 combineReducers 를 사용해줬지만, RTK 에서는 configureStore 를 사용해줬다*/}
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
