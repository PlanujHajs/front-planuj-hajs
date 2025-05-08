import { BaseSyntheticEvent, PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z, ZodType } from 'zod';

import { SxProps } from '@mui/material';

type BaseProps<
  T extends FieldValues,
  K extends ZodType | undefined,
> = PropsWithChildren<{
  methods: UseFormReturn<T>;
  onSubmit?: (
    data: K extends ZodType ? z.infer<K> : T,
    event?: BaseSyntheticEvent
  ) => Promise<void> | void;
  validator: K extends ZodType ? K : undefined;
  onReset?: (event?: BaseSyntheticEvent) => void;
  id?: string;
  sx?: SxProps;
}>;

export type FormWrapperProps<
  T extends FieldValues,
  K extends ZodType | undefined,
> = K extends ZodType
  ? BaseProps<T, K>
  : Omit<BaseProps<T, K>, 'validator'> & {
      validator?: undefined;
    };
