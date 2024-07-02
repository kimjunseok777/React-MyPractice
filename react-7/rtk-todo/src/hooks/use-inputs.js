import { useState } from "react"

const useInputs = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const onChangeInputs = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    return [value, onChangeInputs]
}

export default useInputs