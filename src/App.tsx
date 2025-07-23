import "./App.css";
import { Route, Routes } from "react-router";
import Todos from "./pages/todo/Todos";
import Home from "./pages/home/Home";
import MobileLayout from "./components/MobileLayout";

function App() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route index element={<Home />} handle={{ title: 'Home' }} />
        <Route path="todos" element={<Todos />} handle={{ title: 'Todo List' }} />
      </Route>
    </Routes>
  );
}

export default App;
