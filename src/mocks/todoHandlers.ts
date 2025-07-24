import { http, HttpResponse } from "msw";

const sampleTodos = [
  {
    id: 1,
    title: "Test Todo",
    detail: "Detail text",
    dueDate: "2025-12-31",
    status: "Todo",
    createdAt: "2025-06-01",
    checklist: [
      {
        id: 1,
        text: "Item 1",
        done: false,
      },
    ],
  },
];

export const handlers = [
  // GET /todos 요청을 처리
  http.get("/todos", () => {
    return HttpResponse.json(sampleTodos);
  }),

  // DELETE /todos/:id 요청을 처리
  http.delete("/todos/:id", () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // PUT /todos/:id 요청을 처리
  http.put("/todos/:id", async ({ request, params }) => {
    const { id } = params;
    const updatedData = await request.json();
    const safeUpdatedData =
      updatedData && typeof updatedData === "object" ? updatedData : {};
    return HttpResponse.json({
      ...sampleTodos[0],
      ...safeUpdatedData,
      id: Number(id),
    });
  }),

  // POST /todos 요청을 처리
  http.post("/todos", async ({ request }) => {
    const newTodo = await request.json();
    return HttpResponse.json(
      {
        id: Date.now(),
        ...(newTodo && typeof newTodo === "object" ? newTodo : {}),
      },
      { status: 201 }
    );
  }),
];
