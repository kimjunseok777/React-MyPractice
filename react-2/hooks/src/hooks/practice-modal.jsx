import { useEffect } from "react"

const Modal = () => {

    useEffect(() => {
        alert('모달창이 열렸습니다')
        return () => {
            alert('모달창이 열렸습니다')
        }
    }, [])

    return <div>모달창</div>
}
export default Modal