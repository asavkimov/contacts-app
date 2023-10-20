import { FC, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/header/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { User } from 'domain/entities/user';
import { setUser } from 'store/auth/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const DefaultLayout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data: User = {
          id: user.uid,
          email: user.email,
        };

        dispatch(setUser(data));
      } else {
        if (!location.pathname.includes('register')) {
          navigate('/login');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showHeader = useMemo(() => {
    return !location.pathname.includes('register') && !location.pathname.includes('login');
  }, [location.pathname]);

  return (
    <section className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main className="p-4">
        <Outlet />
      </main>
    </section>
  );
};

export default DefaultLayout;
