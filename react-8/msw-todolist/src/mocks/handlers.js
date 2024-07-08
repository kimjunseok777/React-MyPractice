import * as UserApi from "./apis/user.api"  //-->  Mock 데이터가 있는 login 받아온 것이다
// 이렇게 import 받으면 객체형태로 export 되어 있는 것들을 다 가져온다
// 그렇기에 { login : function } 이렇게 사용할 것이다  -->  export 된 login 으로 value 인 function 만 가져올 것이다


// 작성하기 전에 msw 공식문서 확인해보자 **  -->  모두 삭제하고 UserApi 로 바꿔줬다
// 이 handlers 배열 안에 가상의 api 들을 넣을 것이다
// export 되어 있는 login 의 value 인 function 만 handlers 배열에 넣어준 것이다 (객체의 값만 가져온 것이다)
export const handlers = [...Object.values(UserApi)]
//-->  이렇게 하면 handlers 에 자동으로 등록 된 것이기에 사용하면 된다
