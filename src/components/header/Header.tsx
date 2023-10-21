import Button from 'components/ui/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'store/auth/slice';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm shadow-primary-light">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <Link to="/contacts">
          <h1 className="text-primary font-bold">AX CONNECTS</h1>
        </Link>
        <div className="flex items-center gap-[16px]">
          {user && (
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={
                  user?.photoUrl
                    ? user.photoUrl
                    : 'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg'
                }
                alt="User photo"
              />
              <h4>{user.displayName || user.email}</h4>
            </div>
          )}
          <Button className="h-[40px] btn btn-outline-danger !py-0 text-sm" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
      <div className="bg-blue-light bg-blue bg-yellow bg-yellow-dark bg-green bg-green-light bg-red-200 bg-white text-white"></div>
    </header>
  );
};

export default Header;
