import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import store from 'store/store';

import ContactsPage from 'components/contacts-page/ContactsPage';
import LoginPage from 'components/auth-page/LoginPage';
import RegisterPage from 'components/auth-page/RegisterPage';
import DefaultLayout from 'components/layout/DefaultLayout';
import ContactsCreatePage from 'components/contacts-page/ContactsCreatePage';

const App = () => {
  const methods = useForm();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <FormProvider {...methods}>
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/contacts" />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contacts/create" element={<ContactsCreatePage />} />
              <Route path="/contacts/:id" element={<ContactsPage />} />
            </Routes>
          </DefaultLayout>
        </FormProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
