import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>HOME</div>
      <div onClick={() => navigate("/todos")}>move todo</div>
    </>
  );
};

export default Home;
