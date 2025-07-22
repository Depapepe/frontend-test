import "./App.css";
import { Route, Routes } from "react-router";
import Todos from "./pages/todo/Todos";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
}

export default App;
