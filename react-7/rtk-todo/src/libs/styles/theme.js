
// 디자인 토큰 (시각적 디자인의 원자)
// 디자이너가 정의한 디자인과 관련된 가장 원자적인 (최소의) 값을 일련의 토큰화 (값) 하여 관리한 것을 의미

//-->  개발자는 이러한 디자인 토큰 혹은 컴포넌트 등을 개발에 적용할 필요가 있는데, 이를 디자인 시스템이라고 한다
//-->  ex) 아이콘, 컬러, 버튼, ...

// 디자인 시스템을 적용할 때 토큰 값은 디자이너가 정해주는 것이다

const COLORS = {
    primary: "#00C7AE",
    text: {
        black: '#111111',
        white: '#ffffff'
    },
    Gray: {
        1: '#e9e9e9',
        2: '#d9d9d9',
        3: '#656565'
    }
}

const FONT_SIZE = {
    small: "14px",
    medium: "18px",
    large: "20px"
}

//--> 위에 있는 것들을 각각 export 해도 괜찮지만, 스타일드 컴포넌트에 "ThemeProvider" 라고 하는 기능이 있기에,
//--> 그 기능을 사용하려고 "theme" 으로 객체화 시켜서 export 해준 것이다

//==>  매번 import 하지 않아도 자동으로 값이 전달된다 (ThemeProvider 기능 사용했을 시에)  -->  자동으로 값이 import 된다
export const theme = {
    colors: COLORS,
    fontSize: FONT_SIZE
}

//--> 디자인 토큰 모두 제작했으면, App.js 로 이동해서 경로를 "ThemeProvider" 로 감싸주자