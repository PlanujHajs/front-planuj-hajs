import { ReactNode } from 'react';

import { SxProps, TextFieldProps } from '@mui/material';

export type TextInputProps<T> = Omit<TextFieldProps, 'onChange'> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  name: string;
  wrapperSx?: SxProps;
  onChange?: (value: T) => void;
  normalizer?: (value: string) => T;
};
