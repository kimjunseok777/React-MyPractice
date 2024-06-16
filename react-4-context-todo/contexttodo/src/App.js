// import logo from './logo.svg'; //--> 원래 기본으로 있던 create-react-app 의 기본 페이지 로고 가져오는 거라 주석 처리 해준 것 (삭제해줘도 됨)
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from "./libs/routes/router"  //-->  export default 로 추출해줬기에 이름 마음대로 설정 가능한 것을 확인 가능
import { ThemeProvider } from 'styled-components';
import { theme } from './libs/styles/theme';
import TodoProvider from './store/todo.store';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <TodoProvider>
            <RouterProvider router={router} />
        </TodoProvider>
    </ThemeProvider>
  );
}

export default App;

