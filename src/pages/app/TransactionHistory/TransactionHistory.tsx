import { useListExpensesExpensesGet } from '@/api/expenses/expenses';
import { useListIncomesIncomesGet } from '@/api/incomes/incomes';
import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

// TODO: PLACEHOLDER, ADD FORM PAGE
const TransactionHistory = () => {
  const { data: expenses = [] } = useListExpensesExpensesGet();
  const { data: incomes = [] } = useListIncomesIncomesGet();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="h3" component="h1">
        Tranzakcje:
      </Typography>

      <Typography variant="h4" component="h2">
        Expenses
      </Typography>
      {expenses.map(({ amount, description, date }) => (
        <Paper sx={{ padding: '2rem' }} key={description}>
          <Typography>{description}</Typography>
          <Typography>{amount} zł</Typography>
          <Typography>{date}</Typography>
        </Paper>
      ))}

      <Typography variant="h4" component="h2">
        Incomes
      </Typography>

      {incomes.map(({ amount, description, date }) => (
        <Paper sx={{ padding: '2rem' }} key={description}>
          <Typography>{description}</Typography>
          <Typography>{amount} zł</Typography>
          <Typography>{date}</Typography>
        </Paper>
      ))}
    </Box>
  );
};
export default TransactionHistory;
