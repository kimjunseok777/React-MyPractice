import { handlers } from "./handlers";
// import { setupServer } from 'msw/node' //--> 공식문서에서 복사해온 것이다
import { setupWorker } from 'msw/browser' //--> 위에거 "msw/node" 로 import 받아온 것 오류떠서 이걸로 바꿔준 것이다
// setupServer 에서 setupWorker 로 바꿔줬음


// 공식문서 보고 만든 것이다
export const server = setupWorker(...handlers)
// setupWorker : 브라우저 환경에서 네트워크 요청을 모킹하는 데 사용된다, 이를 통해 개발자는 실제 서버와의 통신 없이도 네트워크 요청을 테스트하고 디버깅할 수 있다
// 이 server 를 최상위 컴포넌트에 App.js 에서 import 받아와서 start() 로 실행시켜준 것이다
