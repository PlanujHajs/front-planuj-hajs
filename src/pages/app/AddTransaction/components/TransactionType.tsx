import { Box, Button, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputWrapper from '@/components/form/InputWrapper';

const TransactionType = ({ disabled }: { disabled: boolean }) => {
  const methods = useFormContext();

  return (
    <Controller
      control={methods.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputWrapper errorMessage={error?.message} fullWidth>
          <Box sx={{ display: 'grid', gap: '1rem' }}>
            <Typography>Typ transakcji</Typography>
            <Button
              disabled={disabled}
              color="success"
              sx={{ width: '100%' }}
              startIcon={<AddIcon />}
              variant={value === 'income' ? 'contained' : 'outlined'}
              onClick={() => {
                onChange('income');
              }}
            >
              Przychody
            </Button>
            <Button
              disabled={disabled}
              color="error"
              variant={value === 'expense' ? 'contained' : 'outlined'}
              onClick={() => {
                onChange('expense');
              }}
              startIcon={<RemoveIcon />}
              sx={{ width: '100%' }}
            >
              Wydatki
            </Button>
          </Box>
        </InputWrapper>
      )}
      name="type"
    />
  );
};

export default TransactionType;
