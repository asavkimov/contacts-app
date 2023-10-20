import { createBrowserRouter } from 'react-router-dom';

import LoginPage from 'components/login-page/LoginPage';
import RegisterPage from 'components/register-page/RegisterPage';
import DefaultLayout from 'components/layout/DefaultLayout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default routes;
