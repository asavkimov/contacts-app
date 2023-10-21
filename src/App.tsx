import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import store from 'store/store';

import ContactsPage from 'components/contacts-page/ContactsPage';
import LoginPage from 'components/auth-page/LoginPage';
import RegisterPage from 'components/auth-page/RegisterPage';
import DefaultLayout from 'components/layout/DefaultLayout';
import ContactsActionPage from 'components/contacts-page/ContactsActionPage';
import ContactPage from 'components/contacts-page/ContactPage';

const App = () => {
  const methods = useForm();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <FormProvider {...methods}>
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/contacts" />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contacts/create" element={<ContactsActionPage />} />
              <Route path="/contacts/:id" element={<ContactPage />} />
              <Route path="/contacts/:id/edit" element={<ContactsActionPage edit={true} />} />
            </Routes>
          </DefaultLayout>
        </FormProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
