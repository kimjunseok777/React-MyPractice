import { HttpResponse, http } from "msw"

// 이 배열 안에 가상의 api 들을 넣을 것이다
export const handlers = [
    http.get("/todo", () => {
        return HttpResponse.json({
            id: 1,
        })
    })
]