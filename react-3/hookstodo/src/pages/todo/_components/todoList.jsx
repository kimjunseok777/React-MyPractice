import styled from "styled-components"
import OneTodo from "./oneTodo"

const TodoList = ({todos, setTodos}) => {

    
    // 삭제 :
    // 여기서 deleteTodo 함수를 만들어 주고, oneTodo.jsx 로 속성으로 전달 해서, 클릭 이벤트로 매개변수를 전달받는 함수가 되는 것이다
    const deleteTodo = (todoId) => {
        const filterTodo = todos.filter((todo) => todo.id !== todoId)
        setTodos(filterTodo)
    }

    
    // 수정 :
    // 수정 요직 만들기 위해 updateTodo 함수 만들어서 oneTodo.jsx 로 속성으로 전달해준 것 (todos, setTodos 가 todoList.jsx 에 있기에 여기서 만들어 주고 전달한 것)
    const updateTodo = ({todoId, content}) => {
        const temp_todos = [...todos] //--> 복사본 배열 생성 (새로운 주소 생성)
        let selectTodoIndex = temp_todos.findIndex((todo) => todo.id === todoId)
        //--> 복사본 배열에서 수정 버튼을 클릭한 투두리스트의 id 값을 todoId 매개변수로 받고, 그 매개변수와 id 값이 똑같은 투두리스트의 인덱스를 가져오겠다는 것이다
        //--> 즉, 수정할 부분을 index 로 찾고, 그 인덱스 값을 selectTodoIndex 변수의 값으로 선언해준 것이다

        temp_todos[selectTodoIndex] = {
            ...temp_todos[selectTodoIndex],
            content
        } //--> 수정할 부분을 전개 연산자로 내용 그대로 받아오고, content 만 바꿔주겠다는 애기이다

        // temp_todos[selectTodoIndex].content = content  -->  이렇게 바꿔줘도 된다
        // selectTodo.content = content  -->  이렇게 바꿔줘도 된다 (findIndex 가 아닌 find 사용한 것)

        /*
            findIndex 가 아닌 find 를 사용했을 때:
            find 를 사용하면 찾은 배열의 인덱스 부분의 주소값을 바꿔버린다  -->  수정해도 이 친구의 수정해야되는 부분을 바꾸지 않는다
            -->  find 로 찾아서 수정하면, 원래 배열이 그거 자기 주소가 아니라서 수정하지 않는다  -->  와전히 다른 값으로 생각한다
            -->  주소인 index 방은 그대로 있고, 안에 내용물만 바뀐 것이다  -->  주소가 그대로라 수정은 됐지만, 적용이 되지 않는 것이다

            ==>  그래서 findIndex 로 index 바라보고 있는 데이터 객체 자체를 바꾸는 방법으로 진행해준 것이다

            ==>  배열의 값을 통채로 바꿀 때는 findIndex 사용해주는 것이 좋고, 일부분만 바꿀 때는 find 로 접근해서 selectTodo.content 이렇게 접근해줘도 괜찮다

            selectTodo.content 이친구가 되는 이유는
            --> 새로운 주소를 만든 것이 아니라, 인덱스가 바라보고 있는 원래 주소의 객체 데이터 값을 수정한 것이다  -->  이때는 find 써도 괜찮다

            하지만 아래 이친구는 안된다 (find 사용한 것)
            selectTodo = {
                ...selectTodo,
                content
            }
        */

        setTodos(temp_todos)
    }

    return (
        <S.Wrapper>
            {todos.map((todo)=>(
                <OneTodo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
            ))}
        </S.Wrapper>
    )
}
export default TodoList

const Wrapper = styled.div`
    padding: 32px 0;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const S = {
    Wrapper
}