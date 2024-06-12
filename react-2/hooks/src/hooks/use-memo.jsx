import { useState } from "react"
import { useMemo } from "react"


const UseMemo = () => {

    const [forceReRender, setForceReRender] = useState(true)

    // const count = 1
    const [count, setCount] = useState(1)
    
    //-----------------------------------------------------------------------------------------------------------------------------------

    // useMemo 사용 안함 :

    // // 즉시실행함수 : (() => {})()
    // const sum = (() => {
    //     console.log('memo')
    //     return 5 + count
    // })()
    // //-->  sum 의 값은 6이 나온다  -->  리랜더링 되어도 값이 6 그대로이다  -->  리랜더 버튼을 누르면 콘솔이 뜨고 연산을 다시한다
    // //-->  연산을 다시 할 필요가 없다  -->  useMemo 를 사용하면 된다

    //-----------------------------------------------------------------------------------------------------------------------------------

    // useMemo 사용함 :

    const sum = useMemo(() => {
        console.log('memo')  //-->  리랜더 버튼을 눌러도 이 함수 실행을 다시 하지 않는다
        return 5 + count  //-->  return 연산 결과를 저장하고 있다
    }, [count]) //-->  count 값이 바뀌면, 연산을 다시 할 수 있게 "의존성 배열" 에 넣어준 것이다

    // 주의사항 : 저장한다는 것은 코스트가 든다  -->  useMemo 는 함부로 남발하면 안된다
    // for 중첩문, map.find ... 등등 연산을 두번 이상 해야하는 경우에 많이 쓴다 (연산이 deep 해질 때 사용하면 좋다, 덩치가 크면 useMemo를 써라)

    // 얘가 리랜더링 되었을 때 연산되어야하는 순간도 있지 않을까?  -->  count 의 값이 바뀌면, 연산이 다시 되어야 한다
    //-->  이럴 때는 값이 바뀔 때 연산을 다시할 수 있게끔, 바뀔 수 있는 값을 "의존성 배열" 에 넣어주면 된다
    //-->  count 의 값이 바뀌면, 리랜더링 되었을 때 다시 연산해서 결과를 저장한다

    //==>  react 레서 상태는 여러개이다. 이 상태가 바뀌었을 때만 다시 연산하라고 명시하는 것이다  -->  의존성 배열에 들어간 상태가 아니면, 상태가 바뀌어도 연산 X

    //==>  즉, 화면을 다시 그려야하니까, 의존성배열에 넣어준 count 는 상태 (useState) 이어야 한다

    //==>  리랜더 버튼을 누르면 아무 콘솔도 찍히지 않지만, count 값이 변하면 콘솔이 찍히는 것을 확인할 수 있다 (count 가 의존성 배열에 있기 때문)
    //-->  리랜더링은 되지만, 여기 있는 연산인 useMemo 가 실행되지는 않는 것이다

    //-----------------------------------------------------------------------------------------------------------------------------------

    return <div>
        {forceReRender ? "진실" : "거짓"} {/*리랜더링이 잘 되고있는지 확인하기위해 넣어준 것*/}
        {sum}
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setForceReRender((prev) => !prev)}>리랜더</button>
    </div>
}
export default UseMemo