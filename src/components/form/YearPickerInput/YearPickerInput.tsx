import { Controller, useFormContext } from 'react-hook-form';

import { SxProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import InputWrapper from '../InputWrapper';

type Props = {
  name: string;
  label: string;
  helperText?: string;
  wrapperSx?: SxProps;
  fullWidth?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

const YearPickerInput = ({
  name,
  label,
  helperText,
  wrapperSx,
  fullWidth,
  minDate,
  maxDate = new Date(),
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller<Record<typeof name, Date | null>>
      name={name}
      control={control}
      render={({
        fieldState: { error },
        field: { value = null, ...fieldProps },
      }) => (
        <InputWrapper
          sx={wrapperSx}
          fullWidth={fullWidth}
          helperText={helperText}
          errorMessage={error?.message}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              {...fieldProps}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              label={label}
              views={['year']}
              slotProps={{ textField: { error: !!error } }}
            />
          </LocalizationProvider>
        </InputWrapper>
      )}
    />
  );
};

export default YearPickerInput;
