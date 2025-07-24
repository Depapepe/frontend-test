import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full items-center justify-center p-4">
      <button
        onClick={() => navigate('/todos')}
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Todo List
      </button>
    </div>
  );
};

export default Home;
