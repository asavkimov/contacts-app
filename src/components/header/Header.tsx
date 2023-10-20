import Button from 'components/ui/Button';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/auth/slice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm shadow-primary-light">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <h1 className="text-primary font-bold">AX CONNECTS</h1>
        <Button className="btn btn-primary py-2" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
};

export default Header;
