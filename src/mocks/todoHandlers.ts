import { http, HttpResponse } from "msw";

const sampleTodos = [
  {
    id: 1,
    title: "Test Todo",
    detail: "Detail text",
    dueDate: "2024-01-01",
    status: "Todo",
    createdAt: "2023-01-01",
    checklist: [],
  },
];

export const handlers = [
  // GET /todos 요청을 처리합니다.
  http.get("/todos", () => {
    return HttpResponse.json(sampleTodos);
  }),

  // DELETE /todos/:id 요청을 처리합니다.
  http.delete("/todos/:id", () => {
    // 실제로는 id에 해당하는 todo를 sampleTodos에서 제거할 수 있습니다.
    // 여기서는 간단히 성공 응답만 보냅니다.
    return new HttpResponse(null, { status: 204 });
  }),

  // PUT /todos/:id 요청을 처리합니다.
  http.put("/todos/:id", async ({ request, params }) => {
    const { id } = params;
    const updatedData = await request.json();
    // Ensure updatedData is an object before spreading
    const safeUpdatedData =
      updatedData && typeof updatedData === "object" ? updatedData : {};
    return HttpResponse.json({
      ...sampleTodos[0],
      ...safeUpdatedData,
      id: Number(id),
    });
  }),

  // POST /todos 요청을 처리합니다.
  http.post("/todos", async ({ request }) => {
    const newTodo = await request.json();
    return HttpResponse.json(
      {
        id: Date.now(), // 임시 ID 생성
        ...(newTodo && typeof newTodo === "object" ? newTodo : {}),
      },
      { status: 201 }
    );
  }),
];
