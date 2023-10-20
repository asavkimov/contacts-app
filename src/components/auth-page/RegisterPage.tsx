import { FC } from 'react';
import FormInput from 'components/form/FormInput';
import Button from 'components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import api from 'api';
import { Messages } from 'components/form/messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'store/hooks';
import { setUser } from 'store/auth/slice';
import ContinueWithSocialMedia from './ContinueWithSocialMedia';

interface SubmitData {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email(Messages.NOT_VALID_EMAIL).required(Messages.REQUIRED_FIELD),
  password: yup.string().min(8, Messages.PASSWORD_LENGTH_8).required(Messages.REQUIRED_FIELD),
});

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, setError } = useForm<SubmitData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<SubmitData> = async (data) => {
    try {
      const user = await api.auth.register(data);

      dispatch(setUser(user));
      navigate('/');
    } catch (err) {
      setError('email', { message: Messages.EMAIL_ALREADY_EXISTS });
    }
  };

  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
        <h1 className="text-4xl font-semibold text-center text-gray-900">Регистрация</h1>
        <ContinueWithSocialMedia />
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            control={control}
            rules={{ required: 'Заполните поле' }}
            label="Email"
          />
          <FormInput
            name="password"
            control={control}
            rules={{ required: 'Заполните поле' }}
            label="Пароль"
            type="password"
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </form>
        <div className="my-2 text-center">
          <Link to="/login" className="text-sm text-gray-700 underline hover:text-purple-700">
            Войти в аккаунт
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
