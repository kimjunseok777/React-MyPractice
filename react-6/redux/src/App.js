import './App.css';
import { Provider } from "react-redux"
import Todo from './components/todo';
import { createStore } from 'redux';
import { rootReducer } from './reducer/root';


// 여기 createStore 안에 Reducer 가 들어가는 것이다
const store = createStore(rootReducer)  //-->  combineReducers 해준 것을 넣어준 것이다
//-->  이거 쓰지 말고 "configureStore" 쓰는걸 추천한다고 줄 그어져 있는 것이다 (상관 안써도 된다)
// Store 생성해준 것이다  -->  중앙 저장소를 생성한 것이다


function App() {
  return (
    <Provider store={store}>
      {/* 전역상태관리를 위한 Provider 를 생성한 것이다  -->  중앙저장소를 생성한 것을 "전역상태" 로 사용하는 것이다 */}
      <Todo/>
    </Provider>
  );
}

export default App;
