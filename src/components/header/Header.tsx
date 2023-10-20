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
    <header className="sticky top-0 bg-white shadow-md">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <p>AX CONNECTS</p>
        <Button className="btn btn-light" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
};

export default Header;
