import { ReactNode } from 'react';
import { Noop, RefCallBack } from 'react-hook-form';

import { SelectChangeEvent, SelectProps, SxProps } from '@mui/material';

export type Option<T = string, K = ReactNode> = {
  value: T;
  label: K;
  key?: string;
};

export type SelectInputProps<T extends string | string[] = string> = {
  name: string;
  options: Option<string | number, string>[];
  label: string;
  wrapperSx?: SxProps;
  children?: (data: { currentValue: string | string[] }) => ReactNode[];
} & Omit<SelectProps<T>, 'children'>;

export type FieldProps<T extends string | string[] = string> = {
  onChange: (event: SelectChangeEvent<T>, child: ReactNode) => void;
  onBlur: Noop;
  value: T;
  name: string;
  ref: RefCallBack;
};
