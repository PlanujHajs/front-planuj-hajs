import { FC, ReactNode } from 'react';
import { Message as ErrorMessage } from 'react-hook-form';

import { FormControl, FormControlProps, FormHelperText } from '@mui/material';

export type InputWrapperProps = {
  helperText?: ReactNode;
  errorMessage?: ErrorMessage;
} & FormControlProps;

const InputWrapper: FC<InputWrapperProps> = ({
  children,
  errorMessage,
  helperText = errorMessage,
  ...rest
}) => (
  <FormControl error={!!errorMessage} {...rest}>
    {children}
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default InputWrapper;
