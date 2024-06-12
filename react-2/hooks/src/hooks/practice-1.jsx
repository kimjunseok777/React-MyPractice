import { useRef, useState } from "react"


const PracticeState = () => {

    const [forceRender, setForceRender] = useState(true)

    let b = useRef([
        {
            title: 'example-1'
        },
        {
            title: 'example-2'
        },
    ])

    const titleInputRef = useRef()

    // const title = titleInputRef.current.value
    //-->  이렇게 함수 밖에다가 작성하면(title 선언) value 속성이 없다는 오류가 뜬다 (value 속성의 정의되어있지 않다라고 뜬다)

    const onPressPushElement = () => {
        const title = titleInputRef.current.value  //-->  이걸 왜 onPressPushElement 함수 안에 작성해줘야(title 선언) 위의 오류가 뜨지 않는 것일까?
        b.current.push({title})
        titleInputRef.current.value = ""

        console.log(b.current)
    }

    return <div>
        {
            b.current.map((el, index) => <p key={index}>{el.title}</p>)
        }
        <input ref={titleInputRef} placeholder="제목을 입력해주세요"/>
        <button onClick={onPressPushElement}>추가</button>
        <button onClick={() => setForceRender((prev) => !prev)}>리랜더</button>
    </div>
}
export default PracticeState