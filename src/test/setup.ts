import { server } from "../mocks/server.js";
import { afterAll, afterEach, beforeAll } from "vitest";
import "@testing-library/jest-dom";
import "whatwg-fetch";

// 모든 테스트 시작 전에 서버를 리슨합니다.
// onUnhandledRequest 옵션을 추가하여 처리되지 않은 요청이 있으면 에러를 발생시킵니다.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// 각 테스트가 끝난 후 핸들러를 리셋합니다.
afterEach(() => server.resetHandlers());

// 모든 테스트가 끝난 후 서버를 종료합니다.
afterAll(() => server.close());
