import { useCallback, useRef, useState } from 'react';
import {
  Controller,
  ControllerFieldState,
  useFormContext,
} from 'react-hook-form';

import {
  Checkbox,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import InputWrapper from '../InputWrapper';
import { FieldProps, SelectInputProps } from './SelectInput.types';

const SelectInput = <T extends string | string[] = string>({
  label,
  options,
  name,
  onChange: handleChange,
  required,
  children,
  wrapperSx = {},
  sx,
  multiple,
  onBlur: handleBlur,
  ...props
}: SelectInputProps<T>) => {
  const { control } = useFormContext();
  const selectRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpened] = useState(false);

  const handleValueRender = useCallback(
    (value: string | string[]) =>
      value.length
        ? Array.isArray(value)
          ? value
              .map(
                (hiddenValue) =>
                  options.find((option) => option.value === hiddenValue)?.label
              )
              .join(', ')
          : options.find((opt) => opt.value === value)?.label
        : null,
    [options]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, ref, onChange, onBlur, ...rest },
        fieldState: { error },
      }: {
        field: FieldProps<T>;
        fieldState: ControllerFieldState;
      }) => (
        <InputWrapper sx={wrapperSx} errorMessage={error?.message} fullWidth>
          <InputLabel required={required} id={name}>
            {label}
          </InputLabel>
          <Select<T>
            input={<OutlinedInput required={required} label={label} />}
            inputRef={ref}
            id={name}
            multiple={multiple}
            labelId={name}
            onClose={() => {
              onBlur();
              setOpened(false);
            }}
            sx={sx}
            onOpen={() => {
              setOpened(true);
            }}
            onChange={(event, node) => {
              onChange(event, node);
              handleChange?.(event, node);
            }}
            open={open}
            onBlur={(event) => {
              handleBlur?.(event);
              onBlur();
            }}
            value={value}
            renderValue={handleValueRender}
            inputProps={{
              ref: selectRef,
              tabIndex: -1,
            }}
            {...rest}
            {...props}
          >
            {children
              ? children({ currentValue: value })
              : options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {multiple && (
                      <Checkbox
                        checked={value.includes(option.value as string)}
                      />
                    )}
                    <span>{option.label}</span>
                  </MenuItem>
                ))}
          </Select>
        </InputWrapper>
      )}
    />
  );
};

export default SelectInput;
