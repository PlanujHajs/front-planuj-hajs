import { useForm } from 'react-hook-form';

import { Button } from '@mui/material';

import FormWrapper from '@/components/form/FormWrapper';
import PasswordInput from '@/components/form/PasswordInput';
import TextInput from '@/components/form/TextInput';
import authStyles, {
  SingleColumnGrid,
  SpacedButtonsContainer,
} from '../auth.styles';
import { AuthHeader } from '../components';

type RegisterFormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

// TODO: Handle Register logic here
const onSubmit = (data: RegisterFormData) => {
  console.log(data);
};

const Register = () => {
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
      <AuthHeader text="Rejestracja" />

      <SingleColumnGrid>
        <TextInput label="E-mail" name="email" type="email" />
        <PasswordInput />
        <PasswordInput label="Powtórz hasło" name="repeatPassword" />
      </SingleColumnGrid>

      <SingleColumnGrid>
        <Button variant="contained" color="primary" type="submit">
          Zarejestruj
        </Button>

        <SpacedButtonsContainer>
          <Button variant="text" type="button">
            {/* TODO: HOOK UP REDIRECT-LINK */}
            Zapomniałem hasła
          </Button>
          <Button variant="text" type="button">
            {/* TODO: HOOK UP REDIRECT-LINK */}
            Mam już konto
          </Button>
        </SpacedButtonsContainer>
      </SingleColumnGrid>
    </FormWrapper>
  );
};
export default Register;
