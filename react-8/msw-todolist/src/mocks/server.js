import { handlers } from "./handlers";
// import { setupServer } from 'msw/node' //--> 공식문서에서 복사해온 것이다
import { setupWorker } from 'msw/browser' //--> 위에거 오류떠서 이걸로 바꿔준 것이다


// 공식문서 보고 만든 것이다
export const server = setupWorker(...handlers)