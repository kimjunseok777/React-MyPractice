import { useState } from "react"
import { useEffect } from "react"
import ModalEffect from "./modal-effect"

const UseEffect = () => {

    const [count, setCount] = useState(5)
    const [isOpenModal, setIsOpenModal] = useState(false)
    //-->  이 분리형 상태 값과 ModalEffect 컴포넌트 만들어주자

    useEffect(() => {
        alert(count)
        /*
            alert 가 두번 뜨는 이유는 React.StrictMode 때문이다  -->  useEffect 가 여러번 실행되더라도 로직에 문제가 있어서는 안된다
            -->  그래서 useEffect 를 두번 실행시킨다  -->  이것은 "개발자 모드" 에서만 그런 것이다  -->  실제로 사이트 배포하면 이러지 않는다
        */
    }, [count])  //-->  빈배열이면 마운트시 1회만 실행하고, 배열에 바뀔 상태를 넣어주면, 상태가 바뀔 때마다 실행하는 것이다
    //-->  의존성 배열에 특정 상태가 변경되었을 대마다 실행할 상태를 넣어주어야 한다

    // 나는 어떤 사이드 이펙트를 일으키고 싶은가?
    // 1. UseEffect 라는 컴포넌트가 마운드 되었을 때  -->  console.log(count)  -->  마운트 되었을 뿐인데, 콘솔로그가 따라오는 것
    // 2. 추가 버튼이 눌렸을 때마다 count 가 바뀐다  -->  count 가 바뀔 때마다 alert(count)  -->  count 가 바뀌었을 뿐인데, alert 가 따라오는 것
    //==>  즉, 위에 둘 다 내가 한 행동은 A 인데, B 가 같이 실행되는 것이다

    return <div>
        <h1>useEffect</h1>
        {isOpenModal && <ModalEffect/>} {/*--> true , false 에 따라서 모달을 열고 닫는다*/}
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setIsOpenModal((prev) => !prev)}>open / close</button> {/*--> 모달을 열고 닫는 버튼*/}
    </div>
}
export default UseEffect