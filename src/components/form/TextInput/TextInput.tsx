import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import InputWrapper from '../InputWrapper';
import { TextInputProps } from './TextInput.types';

const TextInput = <T = string,>({
  name,
  wrapperSx,
  helperText,
  normalizer,
  endAdornment,
  startAdornment,
  slotProps: {
    input: inputSlotProps = {},
    inputLabel: inputLabelSlotProps = {},
    ...restSlotProps
  } = {},
  onChange: parentOnChange,
  onBlur: parentOnBlur,
  ...rest
}: TextInputProps<T>) => {
  const { control } = useFormContext();

  const [focused, setFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field: { onChange, onBlur, ref, value, ...fieldProps },
      }) => (
        <InputWrapper
          sx={wrapperSx}
          fullWidth={rest.fullWidth}
          helperText={helperText}
          errorMessage={error?.message}
        >
          <TextField
            {...fieldProps}
            {...rest}
            value={(value as T) ?? ''}
            error={!!error}
            onWheel={
              rest.type === 'number'
                ? (e) => {
                    (e.target as HTMLElement | undefined)?.blur();
                  } // prevent wheel scroll from changing # value
                : undefined
            }
            inputRef={ref}
            slotProps={{
              ...restSlotProps,
              input: {
                ...(typeof inputSlotProps === 'function'
                  ? inputSlotProps({})
                  : inputSlotProps),
                startAdornment,
                endAdornment,
              },
              inputLabel: {
                ...(typeof inputLabelSlotProps === 'function'
                  ? inputLabelSlotProps({})
                  : inputLabelSlotProps),
                ...(startAdornment
                  ? {
                      shrink: !!value || focused,
                      sx: {
                        transform:
                          value || focused
                            ? 0
                            : 'translate(2.875rem, 1rem) scale(1)',
                      },
                    }
                  : {}),
              },
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={(event) => {
              onBlur();
              setFocused(false);
              parentOnBlur?.(event);
            }}
            onChange={({ target }) => {
              const value = (normalizer?.(target.value) ?? target.value) as T;
              onChange(value);
              parentOnChange?.(value);
            }}
          />
        </InputWrapper>
      )}
    />
  );
};

export default TextInput;
