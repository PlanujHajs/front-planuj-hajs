import { useForm } from 'react-hook-form';

import { Button } from '@mui/material';

import FormWrapper from '@/components/form/FormWrapper';
import PasswordInput from '@/components/form/PasswordInput';
import authStyles, { SingleColumnGrid } from '../auth.styles';
import { AuthHeader } from '../components';

type ResetPasswordFormData = {
  password: string;
  repeatPassword: string;
};

// TODO: Handle ResetPassword logic here
const onSubmit = (data: ResetPasswordFormData) => {
  console.log(data);
};

const ResetPassword = () => {
  const methods = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
      <AuthHeader text="Resetuj hasło" />

      <SingleColumnGrid>
        <PasswordInput label="Nowe hasło" />
        <PasswordInput label="Powtórz nowe hasło" name="repeatPassword" />
      </SingleColumnGrid>

      <Button variant="contained" color="primary" type="submit">
        Resetuj
      </Button>
    </FormWrapper>
  );
};
export default ResetPassword;
