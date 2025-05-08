import { MouseEvent, useState } from 'react';

import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

import TextInput from '../TextInput/TextInput';
import { TextInputProps } from '../TextInput/TextInput.types';

type Props = Omit<TextInputProps<string>, 'name'> & { name?: string };

const PasswordInput = ({
  name = 'password',
  label = 'Hasło',
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextInput
      required
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      startAdornment={
        <InputAdornment position="start">
          <LockIcon />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={togglePasswordVisibility}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      }
      {...rest}
    />
  );
};

export default PasswordInput;
