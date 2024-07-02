

// 훅함수를 사용하지 않는 재사용 함수들을 넣을 것이다 (validate 관련)  -->  main 에서만 쓸 것이다

function validateSignForm({
    email,
    password,
    passwordConfirm
}) {

    const isValidEmail = email.includes("@")
    const isValidPassword = password.length >= 8
    const isValidPasswordConfirm = password === passwordConfirm

    return {
        isValidEmail,
        isValidPassword,
        isValidPasswordConfirm
    }
}
export default validateSignForm