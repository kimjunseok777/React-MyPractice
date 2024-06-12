import { useRef } from "react"
import { useState } from "react"

const UseRef = () => {

    const [forceReRender, setForceReRender] = useState(false)  //-->  상태는 이렇게 상단에다가 정의해주는 것이 좋다

    //------------------------------------------
    // let b = [
    //     {
    //         title: 'example-1'
    //     },
    //     {
    //         title: 'example-2'
    //     },
    // ]
    //------------------------------------------

    const b = useRef([
        {
            title: 'example-1'
        },
        {
            title: 'example-2'
        },
    ])

    // input 의 value 값을 가져오려면 어떻게 해야할까?
    const titleInputRef = useRef()
    // Ref 변수 하나 만들어주고, input 에 "ref" 속성에다가 값으로 넣어주면 된다

    const onPressPushElement = () => {

        const title = titleInputRef.current.value  //-->  input 의 값을 가져온 것이다
        if(!title.trim()) return alert('제목을 입력해주세요')

        // example 이 중복되는 값이 있어서는 안되면 어떻게 해야할까?
        const existTitle = b.current.find((el) => el.title === title)
        if(existTitle) return alert('이미 존재하는 제목입니다')

        // b.push({title: 'example'})
        b.current.push({title})  //-->  useRef 사용했으면, 반드시 current 로 접근해줘야 사용할 수 있다
        // console.log(b)
        console.log(b.current)

        titleInputRef.current.value = ""  //-->  입력했던 값 추가 됐으면 비워주는 것
    }

    return <div>
        <h1>useRef</h1>
        {
            b.current.map((el, index) => <p key={index}>{el.title}</p>)
        }
        <input  ref={titleInputRef} placeholder="제목을 입력해주세요"/>
        {/*input 에다가 ref 속성을 넣어줬다*/}
        <button onClick={onPressPushElement}>추가</button>

        {/* <button onClick={() => setForceReRender(!forceReRender)}>리랜더링</button> */}
        <button onClick={() => setForceReRender((prev) => !prev)}>리랜더링</button>
        {/*
            이렇게 상태변경 함수 안에 콜백함수가 올 수 있다  -->  매개변수로 이전값 (forceReRender) 이 자동으로 온다
            -->  즉, 여기서 매개변수 prev 는 이전값 forceReRender 인 false 이다  -->  !false 를 하면 true가 되는 것이다
            ==>  prev  === forceReRender  -->  바뀌기 전의 값을 가지고올 수 있다
        */}
    </div>

    //==> 결론은 useRef 는 "변수" 인데, 리랜더링이 일어나도 초기화되지 않는 변수라고 알고 있으면 된다

}
export default UseRef