import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Button onClick={() => navigate('/todos')}>Todo List</Button>
    </div>
  );
};

export default Home;
