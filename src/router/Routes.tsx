import { createBrowserRouter } from 'react-router-dom';

import LoginPage from 'components/auth-page/LoginPage';
import RegisterPage from 'components/auth-page/RegisterPage';
import DefaultLayout from 'components/layout/DefaultLayout';
import ContactsPage from 'components/contacts-page/ContactsPage';

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
      {
        path: '/',
        element: <ContactsPage />,
      },
    ],
  },
]);

export default routes;
