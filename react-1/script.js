
const $emailInput = document.querySelector('.email-input')
//--> 이렇게 일일히 지정해줄 필요가 없어진다

const $form = document.querySelector('.form')
/*
    form 태그의 역할 :
    폼 안에 입력 값을 action에 전달하는 역할
*/

// submit 이벤트를 넣게 되면, 이벤트에 form event 라는 친구가 전달이 된다
$form.addEventListener('submit', (event) => {
    event.preventDefault()
    // form은 action 으로 주소를 이동해 데이터를 보내는 기능을 가지고 있는데,
    // 이 기존에 있던 기능을 막는 코드이다 --> preventDefault()

    console.log(event.target.email.value)
    // name 이라는 값을 통해서 target 에 가지고 있는 value 를 가지고 오는 것
    // 즉, form 안에 있는 input 의 value 를 가지고 올 수 있는 것이다

    /*
        submit을 통한 formEvent에 input에 주어진 name을 활용하면
        value를 가지고 올 수 있다
        --> 위에 $emailInput 처럼 일일히 지정해줄 필요 없다
    */

    /*
        submit 이벤트를 사용하게 되면, 제출이 이뤄지면서, 안에 있는
        name 으로 가지고 올 수 있게 되는 것이다
    */
})

/*
    form 은 "제출(submit)" 이 되면, 다른 웹사이트 action 으로 정해진 페이지로
    이동시키려는 습관이 있다

    -->  이런 습관 (기존에 있는 이벤트) 를 막는 기능을 사용해야한다
    -->  preventDefault() 사용해야 한다
    -->  event.preventDefault()

    ==>  이걸 사용하면 "제출" 이 되는 코드를 막을 수 있다
*/

/*
    form 을 사용하는 이유 :

        1. 입력 값을 가지고 오는 것에 대한 편의성

        2. 엔터 입력 시 자동으로 submit 이 되는 기능

        3. 유효성 검사 :

            input 에는 "패턴" 아라는 값이 있는데, input의 값이 이 패턴에서 어긋나면
            자바스크립트에서 이걸 감지하는 기능이 있다

            ex : 이거 이메일 양식이 아니야, 이거 숫자가 아니야 ... 등등 이런식으로 유효성 검사

            ==> 나중에 이런 유효성 검사를 해주는 라이브러리를 사용할


    ---------------------------------------------------------------------


    --> form 태그는 원래는 action으로 데이터를 보내기 위해서 사용했던 것이다
            하지만, 요즘에는 javaScripot 에서 fetch 나 axios 같은 편의성을 가진
            라이브러리 등이 등장했다  -->  기존의 기능 사용 x

            -->  이제 form 태그는 편의성 때문에 기능 때문에 사용하는 것이다
*/
