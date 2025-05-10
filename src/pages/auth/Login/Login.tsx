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

type LoginFormData = {
  email: string;
  password: string;
};

// TODO: Handle login logic here
const onSubmit = (data: LoginFormData) => {
  console.log(data);
};

const Login = () => {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <FormWrapper onSubmit={onSubmit} methods={methods} sx={authStyles.form}>
      <AuthHeader text="Logowanie" />

      <SingleColumnGrid>
        <TextInput required label="E-mail" name="email" type="email" />
        <PasswordInput />
      </SingleColumnGrid>

      <SingleColumnGrid>
        <Button variant="contained" color="primary" type="submit">
          Zaloguj
        </Button>

        <SpacedButtonsContainer>
          <Button variant="text" type="button">
            {/* TODO: HOOK UP REDIRECT-LINK */}
            Zapomniałem hasła
          </Button>
          <Button variant="text" type="button">
            {/* TODO: HOOK UP REDIRECT-LINK */}
            Stwórz nowe konto
          </Button>
        </SpacedButtonsContainer>
      </SingleColumnGrid>
    </FormWrapper>
  );
};
export default Login;
