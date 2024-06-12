// import logo from './logo.svg';
import './App.css';
import PracticeState from './hooks/practice';
import UseCallback from './hooks/use-callback';
import UseEffect from './hooks/use-effect';
import UseMemo from './hooks/use-memo';
import UseRef from './hooks/use-ref';
import UseState from './hooks/use-state';

function App() {
  return <>
    <UseState/>
    <hr/>
    <UseRef/>
    <hr/>
    {/* <UseEffect/> */}
    <hr/>
    <UseMemo/>
    <hr/>
    <UseCallback/>
    <hr/>
    {/* <PracticeState/> */}
  </>
}

/*
  hook 함수 개념 수업은 페이지가 여러개 필요하지 않기 때문에 router 같은 거 사용하지 않고
  컴포넌트들 그냥 App.js 에 바로 import 시켜주면 된다
*/

export default App;
