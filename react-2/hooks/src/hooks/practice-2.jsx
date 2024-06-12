import { useRef, useState } from "react"


const PracticeTwo = () => {

    const b = useRef(5)

    console.log(b)
    console.log(b.current)

    return <div>
        {b.current}
    </div>
}
export default PracticeTwo