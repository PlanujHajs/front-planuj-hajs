import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ROUTES from '@/lib/consts/routes';
import { Button, Alert, CircularProgress } from '@mui/material';

import FormWrapper from '@/components/form/FormWrapper';
import PasswordInput from '@/components/form/PasswordInput';
import TextInput from '@/components/form/TextInput';
import authStyles, {
  SingleColumnGrid,
  SpacedButtonsContainer,
} from '../auth.styles';
import { AuthHeader } from '../components';

import { useRegisterAuthRegisterPost } from '@/api/auth/auth';
import type { UserCreate } from '@/api/types/index.ts';
import { AxiosError } from 'axios';

type RegisterFormData = UserCreate & { repeatPassword: string };

const Register: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { setError, clearErrors } = methods;

  const {
    mutateAsync: register,
    status,
    error,
  } = useRegisterAuthRegisterPost();

  const onSubmit = async (data: RegisterFormData) => {
    if (!data.username.trim()) {
      setError('username', {
        type: 'validate',
        message: 'Nazwa użytkownika nie może być pusta',
      });
      return;
    }
    clearErrors('username');

    if (data.password !== data.repeatPassword) {
      setError('repeatPassword', {
        type: 'validate',
        message: 'Hasła muszą być takie same',
      });
      return;
    }
    clearErrors('repeatPassword');

    try {
      const { repeatPassword: _, ...userData } = data;
      await register({ data: userData });
      await navigate(ROUTES.AUTH.LOGIN.URL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
      <AuthHeader text="Rejestracja" />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {(error as AxiosError<{ detail: string }> | undefined)?.response?.data
            .detail ?? 'Wystąpił błąd podczas rejestracji.'}
        </Alert>
      )}

      <SingleColumnGrid>
        <TextInput label="Nazwa użytkownika" name="username" />
        <PasswordInput label="Hasło" name="password" />
        <PasswordInput label="Powtórz hasło" name="repeatPassword" />
      </SingleColumnGrid>

      <SingleColumnGrid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={status === 'pending'}
          startIcon={
            status === 'pending' ? <CircularProgress size={20} /> : null
          }
        >
          Zarejestruj
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
            onClick={() => void navigate(ROUTES.AUTH.LOGIN.URL)}
          >
            Mam już konto
          </Button>
        </SpacedButtonsContainer>
      </SingleColumnGrid>
    </FormWrapper>
  );
};

export default Register;
