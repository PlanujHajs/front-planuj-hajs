import DatePickerInput from '@/components/form/DatePickerInput/DatePickerInput';
import FormWrapper from '@/components/form/FormWrapper';
import TextInput from '@/components/form/TextInput';
import { Button, InputAdornment, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import TransactionType from './components/TransactionType';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateIncomeIncomesPost,
  useListIncomesIncomesGet,
} from '@/api/incomes/incomes';
import {
  useCreateExpenseExpensesPost,
  useListExpensesExpensesGet,
} from '@/api/expenses/expenses';
import { useCallback, useMemo } from 'react';
import TransactionExpenseCategory from './components/TransactionExpenseCategory';
import { useQueryClient } from '@tanstack/react-query';

const schemaValidation = z.object({
  description: z.string().min(1, 'Nazwa jest wymagana'),
  date: z.date({
    required_error: 'Data jest wymagana',
    invalid_type_error: 'Data jest wymagana',
  }),
  amount: z.string().min(1, 'Kwota jest wymagana'),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Typ transakcji jest wymagany' }),
  }),
  expenseCategory: z.string().optional(),
});

const AddTransaction = () => {
  const queryClient = useQueryClient();
  const methods = useForm({
    defaultValues: {
      description: '',
      amount: '',
      date: undefined,
      type: undefined,
      expenseCategory: '',
    },
    resolver: zodResolver(schemaValidation),
  });

  const { queryKey: incomesQueryKey } = useListIncomesIncomesGet();
  const { queryKey: expensesQueryKey } = useListExpensesExpensesGet();
  const { mutateAsync: createIncome, isPending: incomePending } =
    useCreateIncomeIncomesPost();
  const { mutateAsync: createExpense, isPending: expensePending } =
    useCreateExpenseExpensesPost();

  const submitting = useMemo(
    () => incomePending || expensePending,
    [incomePending, expensePending]
  );

  const onSubmit = useCallback(
    async ({
      type,
      description,
      amount,
      date,
      expenseCategory,
    }: z.infer<typeof schemaValidation>) => {
      const data = {
        description,
        amount: parseFloat(amount),
        date: date.toISOString(),
      };

      if (type === 'income') {
        await createIncome({ data });
        await queryClient.refetchQueries({ queryKey: incomesQueryKey });
      } else {
        if (!expenseCategory) throw new Error('Expense category is required');

        await queryClient.refetchQueries({ queryKey: expensesQueryKey });
        await createExpense({
          data: { ...data, category_id: expenseCategory },
        });
      }
    },
    [
      createIncome,
      queryClient,
      incomesQueryKey,
      expensesQueryKey,
      createExpense,
    ]
  );

  return (
    <Paper sx={{ padding: '2rem' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '2rem' }}>
        Dodaj nową tranzakcję
      </Typography>
      <FormWrapper
        sx={{ display: 'grid', gap: '1rem' }}
        methods={methods}
        onSubmit={onSubmit}
      >
        <DatePickerInput disabled={submitting} name="date" label="Data" />
        <TextInput disabled={submitting} name="description" label="Nazwa" />
        <TransactionType disabled={submitting} />
        {methods.watch('type') === 'expense' ? (
          <TransactionExpenseCategory disabled={submitting} />
        ) : null}
        <TextInput
          helperText="Wprowadź kwotę w formacie 0.00"
          normalizer={(value) => {
            const parsedValue = value.replace(/[^\d.]/g, '');
            const dotCount = parsedValue.split('.').length - 1;
            if (dotCount > 1) {
              return parsedValue.substring(0, parsedValue.lastIndexOf('.'));
            }
            // Limit to 2 decimal places
            const decimalIndex = parsedValue.indexOf('.');
            if (decimalIndex !== -1) {
              const decimalPart = parsedValue.substring(decimalIndex + 1);
              if (decimalPart.length > 2) {
                return parsedValue.substring(0, decimalIndex + 3);
              }
            }
            return parsedValue.replace(/[^\d.]/g, '');
          }}
          disabled={submitting}
          name="amount"
          label="Kwota"
          endAdornment={<InputAdornment position="end">zł</InputAdornment>}
        />
        <Button
          loading={submitting}
          loadingPosition="start"
          variant="outlined"
          type="submit"
          startIcon={<AddIcon />}
        >
          Dodaj
        </Button>
      </FormWrapper>
    </Paper>
  );
};

export default AddTransaction;
