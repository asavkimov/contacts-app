import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from 'components/header/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { setUser } from 'store/auth/slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUserObject } from 'domain/services/user';

interface Props {
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = getUserObject(user);

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

  const isAuthPage = location.pathname.includes('register') || location.pathname.includes('login');

  if (!user && !isAuthPage) {
    return null;
  }

  return (
    <section className="min-h-screen bg-white">
      {!isAuthPage && <Header />}
      <main className="p-4 mx-auto max-w-7xl">{props.children}</main>
    </section>
  );
};

export default DefaultLayout;
