import { ChangeEvent, FC, ReactNode, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  ButtonBaseActions,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
} from '@mui/material';
import { SystemStyleObject } from '@mui/system';

export type CheckboxInputProps = {
  name: string;
  disabled?: boolean;
  triggerFromLabel?: boolean;
  label?: ReactNode;
  wrapperSx?: SystemStyleObject;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
};

const styles = {
  checkboxWrapper: { display: 'flex', alignItems: 'center' },
  label: { marginX: 0 },
  textLabel: (isDisabled?: boolean) => ({
    color: isDisabled ? 'text.secondary' : undefined,
    display: 'inline-block',
  }),
};

const CheckboxInput: FC<CheckboxInputProps> = ({
  label,
  name,
  triggerFromLabel,
  disabled,
  wrapperSx = {},
  onChange: parentOnChange,
}) => {
  const { control } = useFormContext();
  const actionRef = useRef<ButtonBaseActions | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        fieldState: { error },
        field: { value, onBlur, onChange, ref, ...rest },
      }) => (
        <>
          <Box sx={[styles.checkboxWrapper, wrapperSx]}>
            <FormControlLabel
              sx={styles.label}
              label={triggerFromLabel ? label : ''}
              control={
                <Checkbox
                  action={(ref) => {
                    actionRef.current = ref;
                  }}
                  onFocus={() => actionRef.current?.focusVisible()}
                  slotProps={{ input: { ref } }}
                  disabled={disabled}
                  checked={!!value}
                  onChange={(event) => {
                    onChange(event);
                    parentOnChange?.(event);
                    onBlur();
                  }}
                  {...rest}
                />
              }
            />
            {!triggerFromLabel && (
              <Typography sx={styles.textLabel(disabled)}>{label}</Typography>
            )}
          </Box>
          {error && (
            <FormHelperText error>{error.message ?? ''}</FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default CheckboxInput;
