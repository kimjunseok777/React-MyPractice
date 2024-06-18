

// 훅함수를 사용하지 않는 validate 관련된 재사용 되는 함수들을 넣을 것이다 (모듈화할 것이다)  -->  main 페이지에서만 쓴다
// 재사용되는 요직을 함수로 빼고 모듈화 시킨 것이다 (로그인 페이지와 회원가입 페이지에서 같이 쓰이니까 관심사 분리 시켜준 것이다)

export function validateSignForm({
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
