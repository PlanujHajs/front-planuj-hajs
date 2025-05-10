import { useForm } from 'react-hook-form';

import { Button } from '@mui/material';

import FormWrapper from '@/components/form/FormWrapper';
import TextInput from '@/components/form/TextInput';
import authStyles, { SingleColumnGrid } from '../auth.styles';
import { AuthHeader } from '../components';

type ForgotPasswordFormData = {
  email: string;
};

const onSubmit = (data: ForgotPasswordFormData) => {
  console.log(data);
};
// TODO: Handle ForgotPassword logic here

const ForgotPassword = () => {
  const methods = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
      <AuthHeader text="Zapomniałeś hasła?" />

      <SingleColumnGrid>
        <TextInput label="E-mail" name="email" type="email" />
      </SingleColumnGrid>

      <SingleColumnGrid>
        <Button variant="contained" color="primary" type="submit">
          Wyślij link do resetowania hasła
        </Button>
        <Button variant="text" type="button">
          {/* TODO: HOOK UP REDIRECT-LINK */}
          Wróć do logowania
        </Button>
      </SingleColumnGrid>
    </FormWrapper>
  );
};
export default ForgotPassword;
