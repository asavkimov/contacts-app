import Button from 'components/ui/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'store/auth/slice';
import { useNavigate } from 'react-router-dom';

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
        <h1 className="text-primary font-bold">AX CONNECTS</h1>
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
          <Button className="h-[40px] btn btn-primary py-0" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
