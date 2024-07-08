import { LAYOUT_METADATA } from "../_consts/metadata"

export function dynamicLayoutMetadata(pathName) {
    //--> 여기서 받는 매개변수 pathName 는 "/" 또는 "/todo/3" 이 온다

    // return LAYOUT_METADATA[pathName]  //-->  "LAYOUT_METADATA" 객체의 pathName 키값을 반환해줄 것이다 --> pathName이 "/" , "/todo" 아냐에 따라 달라진다
    //-->  ("/" or "/todo") 와 같은 문자열이 들어가면 객체의 "닷 접근법" 이 안되기 때문에, "대괄호 접근법" 을 사용한 것이다

    // 투두 페이지일 때 연산 - 1 :
    // console.log(pathName.split("/")) // ['', 'todo', '3'] 인 배열이 온다  -->  1번째 인덱스 (todo) 를 가져오고, "/" 를 붙여주면 된다
    // return LAYOUT_METADATA["/" + pathName.split("/")[1]] // "/" or "/todo"  -->  메인페이지일 때는 "/" 로 쪼개면 다 없어지기 때문에 그냥 "/" 더해주면 똑같아지는 것이다

    // 투두 페이지일 때 연산 - 2 :
    // " " , "todo" , "3"  -->  0, 1 에 있는 데이터를 가져와서 join("/") 로 연결  -->  "/todo"
    const basePath = pathName.split("/").slice(0, 2).join("/")
    return LAYOUT_METADATA[basePath] // "/" or "/todo" 키에 맞는 값을 반환한다는 의미

    //==> 위의 연산이랑, 아래의 basePath 랑 똑같은 말이다  -->  메인페이지일 때 basePath = "/" 가 된다  -->  투두페이지일 때는 basePath = "/todo"
    // 이렇게 특수한 주소에 따라 연산이 필요한 경우가 있다

    //==>  이제 우리가 metadata (페이지에 따라 헤더, 푸터에 true / false) 가 있기 때문에 컴포넌트 보여줄 때 조건을 넣을 수 있게된다
    // layout.jsx 로 가서 컴포넌트에 조건을 넣어주자

    //==>  dynamicLayoutMetadata 함수의 역할은 "LAYOUT_METADATA" 객체에서 키로 접근해서 값을 반환하는 역할을 한다
}