import { setupServer } from "msw/node";
import { handlers } from "./todoHandlers";

// 테스트를 위한 서버를 설정합니다.
export const server = setupServer(...handlers);
