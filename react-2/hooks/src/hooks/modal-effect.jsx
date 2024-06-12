import { useEffect } from "react"


const ModalEffect = () => {

    useEffect(() => {
        alert("mount modal")
        return () => {
            alert("unmount modal")  //-->  이렇게 useEffect 에서 "return 익명함수" 를 적어주면, 언마운트 되었을 때 실행한다
        }
        //-->  이 컴포넌트가 사용자의 눈에서 사라졌을 때 실행되는 함수 (언마운트)  -->  return ( ) => { }
        //-->  이렇게 "언마운트" 시에 실행시키고 싶은 사이드이펙트가 있다면 return 을 사용해주면 된다
    }, [])
    /*
        return 이 되었다가 다시 한번 실행하는 것이 React.StrictMode 의 기본이다
        -->  그래서 "open/close" 버튼을 누르면 mount - unmount - mount 순으로 알림창이 뜨는 것이다 (신경쓰지 않아도 된다)
        -->  개발자 모드에서만 이런 것이다  -->  실제로 사이트 배포했을 때는 한번만 뜨니 신경쓰지 말자
    */
   /*
        React.StrictMode 없는 화면을 보고 싶으면 index.js 가서 그냥 주석 하면 된다
        -->  나중에 배포할 때는 주석 풀어줘야 한다 (이 모드가 켜져 있는데 에러가 난다면 잘못만든 것이기 때문에 이 모드를 키고 개발하는 것이 중요하다)
        -->  원래는 주석 하면 안된다 !!  -->  주석 했다면 풀어주자
   */

    return <div>:)</div>
}
export default ModalEffect