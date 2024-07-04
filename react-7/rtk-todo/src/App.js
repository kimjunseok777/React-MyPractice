import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';
import {Provider} from "react-redux"  //-->  Provider 받아와서 사용해줬다
import { store } from './store/store';  //-->  Provider 덮개에 중앙관리할 데이터 넣어주기 위해 import 받아온 것 (reducer 들이 들어가있다)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{/*-->  TodoProvider 지워주고, react-redux 에서 import 받은 Provider 로 바꿔준 것이다*/}
        {/*store 는 reducer 들을 key 로 정해서 모아놓은 configureStore 가 있는 데이터이다  -->  중앙 저장소이다*/}
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
