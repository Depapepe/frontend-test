import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import "./index.css";
import MobileLayout from "./layout/MobileLayout";
import Home from "./pages/home/Home";
import Todos from "./pages/todo/Todos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MobileLayout />}>
      <Route index element={<Home />} handle={{ title: "Home" }} />
      <Route path="todos" element={<Todos />} handle={{ title: "Todo List" }} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
