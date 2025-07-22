import { useNavigate } from 'react-router';
import MobileLayout from '../../components/MobileLayout';

const Home = () => {
  const navigate = useNavigate();
  return (
    <MobileLayout title="Home">
      <div className="flex h-full items-center justify-center p-4">
        <button
          onClick={() => navigate('/todos')}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Todo List
        </button>
      </div>
    </MobileLayout>
  );
};

export default Home;
