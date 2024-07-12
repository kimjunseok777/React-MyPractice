import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// msw 가 실행되기 전에  -->  즉, Mocking Api 가 만들어지지도 않았는데, 백엔드에게 요청하게 되버릴 수도 있기에 작성해준 코드
async function enableMocking() {
  if(process.env.NODE_ENV !== "development") {
    return
  }
  const { server } = await import("./mocks/server") //--> Mocking server 가 실행되는 것을 기다리고 나서 밑에있는 랜더 코드 실행하는 것 (await 걸려있다)
  return server.start()
}

//-->  server.start() 로 msw 가 실행되고 나서 랜더링이될 수 있도록 만들어준 것이다
//-->  async 로 만들어준 함수는 then 을 쓸 수 있다
enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)
// const root = ReactDOM.createRoot(document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
