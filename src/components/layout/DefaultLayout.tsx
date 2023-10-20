import { FC, ReactNode, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/header/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { User } from 'domain/entities/user';
import { setUser } from 'store/auth/slice';
import { useAppDispatch } from 'store/hooks';

interface Props {
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data: User = {
          uid: user.uid,
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
      <main className="p-4 mx-auto max-w-7xl">{props.children}</main>
    </section>
  );
};

export default DefaultLayout;
