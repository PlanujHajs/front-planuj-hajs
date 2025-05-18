import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import FormWrapper from '@/components/form/FormWrapper';
import PasswordInput from '@/components/form/PasswordInput';
import TextInput from '@/components/form/TextInput';
import authStyles, {
  SingleColumnGrid,
  SpacedButtonsContainer,
} from '../auth.styles';
import { AuthHeader } from '../components';
import type { BodyLoginAuthTokenPost } from '@/api/types';
import { useLoginAuthTokenPost } from '@/api/auth/auth';
import { useAuth } from '@/context/auth';
import ROUTES from '@/lib/consts/routes';

type LoginFormData = BodyLoginAuthTokenPost;

const Login: React.FC = () => {
  const methods = useForm<LoginFormData>({
    defaultValues: { username: '', password: '' },
  });
  const {
    formState: { isSubmitting, errors },
  } = methods;

  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutateAsync } = useLoginAuthTokenPost();

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    const { username, password } = data;
    try {
      const tokenData = await mutateAsync({
        data: { username, password, grant_type: 'password' },
      });
      login(tokenData.access_token);
      await navigate(ROUTES.APP.DESKTOP.URL);
    } catch (err) {
      console.error('Błąd logowania', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
        <AuthHeader text="Logowanie" />

        <SingleColumnGrid>
          <Controller
            name="username"
            control={methods.control}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Nazwa użytkownika"
                required
                autoComplete="username"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={methods.control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Hasło"
                required
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </SingleColumnGrid>

        <SingleColumnGrid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ładowanie…' : 'Zaloguj'}
          </Button>

          <SpacedButtonsContainer>
            <Button
              variant="text"
              type="button"
              onClick={() => void navigate(ROUTES.AUTH.FORGOT_PASSWORD.URL)}
            >
              Zapomniałem hasła
            </Button>
            <Button
              variant="text"
              type="button"
              onClick={() => void navigate(ROUTES.AUTH.REGISTER.URL)}
            >
              Stwórz nowe konto
            </Button>
          </SpacedButtonsContainer>
        </SingleColumnGrid>
      </FormWrapper>
    </FormProvider>
  );
};

export default Login;
