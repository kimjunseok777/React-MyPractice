import { useState } from "react"

const UseState = () => {

    // const state = true
    const [state, setState] = useState(true)
    // const [ 변수명 , set 변수명 ] = useState( 변수의 초기값 )

    //--------------------------------------------------------------------------------------------
    
    // const onPressTrue = () => {
    //     if(state) {
    //         console.log("진실입니다")
    //     } else {
    //         console.log("거짓입니다")
    //     }
    // } //--> 버튼이 "onPressTrue" 로 유지되는 것이 싫다면, 이렇게 함수 안에서 분기를 치는 방법이 있다
    
    //--------------------------------------------------------------------------------------------

    const onPressTrue = () => {
        console.log("진실입니다")
    }

    const onPressFalse = () => {
        console.log("거짓입니다")
    }

    const onPressChangeState = () => {
        // state = !state  //-->  상태는 이렇게 바꾸면 안되고,
        setState(!state)  //-->  이렇게 "set변수명()" 인 함수형태로 바꿔줘야 한다

        console.log(state)  //-->  false 가 나와야하지만, true 가 나온다
        //-->  "비동기" 로 되어있기 때문에, state 가 변경되고 리랜더링 되기 전까지 값이 바뀌지 않는다  -->  onPressChangeState 함수가 모두 종료되어야, 화면을 리랜더링 한다

        //==>  즉, 상태 변경 후 "같은 코드블럭 (같은 함수) 내에서" 값이 변경 되었을 것이다라고 판단 후 코드를 작성하면 절대 안된다 !!

        console.log(!state)  //-->  즉, false 값이 필요하다면 그냥 "!state" 이거 쓰는 것이 맞다
    }

    return <div>
        {state ? "진실" : "거짓"}

        {/* <button onClick={() => (state ? onPressTrue : onPressFalse)}>클릭</button> */}
        <button onClick={state ? onPressTrue : onPressFalse}>클릭</button>
        {/*-->  화면을 바꿔주지 않는 이상, state 값이 바뀌었다고 해도 "onPressTrue" 로 실행하는 버튼이 계속 유지되는 것이다*/}

        {/* <button onClick={() => onPressChangeState}>변경</button> */}
        <button onClick={onPressChangeState}>변경</button>
    </div>
}
//-->  이 함수는 이미 한번 실행했으니, 다시 실행시켜주지 않는 이상, 화면은 절대 다시 바뀌지 않는다 (재랜더링 되어야 하는 것이다)
//-->  유지되는 게 싫다면, 함수 안에서 if 문 같은 분기를 쳐야한다

export default UseState