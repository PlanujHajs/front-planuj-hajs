import { BaseSyntheticEvent, useCallback } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';
import { z, ZodType } from 'zod';

import { Box } from '@mui/material';

import { FormWrapperProps } from './FormWrapper.types';

const FormWrapper = <T extends FieldValues, K extends ZodType | undefined>({
  id,
  sx,
  onReset,
  methods,
  children,
  onSubmit,
  validator,
}: FormWrapperProps<T, K>) => {
  const submitHandler = useCallback(
    async (data: T, event?: BaseSyntheticEvent) => {
      const returnedData = (
        validator ? validator.parse(data) : data
      ) as K extends ZodType ? z.infer<K> : T;

      event?.preventDefault();
      return onSubmit?.(returnedData, event);
    },
    [onSubmit, validator]
  );

  const handleReset = useCallback(
    (event?: BaseSyntheticEvent) => {
      event?.preventDefault();
      return onReset?.(event);
    },
    [onReset]
  );

  return (
    <FormProvider {...methods}>
      <Box
        id={id}
        sx={sx}
        noValidate
        component="form"
        onReset={handleReset}
        onSubmit={(e) => void methods.handleSubmit(submitHandler)(e)}
      >
        {children}
      </Box>
    </FormProvider>
  );
};

export default FormWrapper;
