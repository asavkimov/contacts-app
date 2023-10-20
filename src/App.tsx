import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import routes from 'router/Routes';
import store from 'store/store';

const App = () => {
  const methods = useForm();

  return (
    <Provider store={store}>
      <FormProvider {...methods}>
        <RouterProvider router={routes}></RouterProvider>
      </FormProvider>
    </Provider>
  );
};

export default App;
