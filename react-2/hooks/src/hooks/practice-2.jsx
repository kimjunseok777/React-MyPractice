import { useCallback, useEffect, useState } from "react"


const PracticeTwo = () => {

    const [count, setCount] = useState(1)

    // const onInit = useCallback(() => {
    //     console.log(5 + count)
    // }, [])

    const onInit = () => {
        console.log(5 + count)
    }

    // useEffect(() => onInit(), [onInit])

    return <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={onInit}>실행</button>
    </div>
}
export default PracticeTwo