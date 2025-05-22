import { format } from 'date-fns';
import {
  useListExpensesExpensesGet,
  useRouteExpensesIdDelete,
} from '@/api/expenses/expenses';
import {
  useListIncomesIncomesGet,
  useRouteIncomesIdDelete,
} from '@/api/incomes/incomes';
import {
  Paper,
  Typography,
  CircularProgress,
  Box as MuiBox,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const overlayStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#f8f1ee',
  boxShadow: '0 0 0 2rem #f8f1ee',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const TransactionHistory = () => {
  const {
    data: expenses = [],
    isPending: isLoadingExpenses,
    refetch: refetchExpesnes,
  } = useListExpensesExpensesGet();
  const {
    data: incomes = [],
    isPending: isLoadingIncomes,
    refetch: refetchIncomes,
  } = useListIncomesIncomesGet();

  const { mutateAsync: deleteIncome, isPending: deletingIncome } =
    useRouteIncomesIdDelete();
  const { mutateAsync: deleteExpense, isPending: deletingExpense } =
    useRouteExpensesIdDelete();

  const isLoading = isLoadingExpenses || isLoadingIncomes;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {isLoading && (
        <MuiBox sx={overlayStyle}>
          <CircularProgress size={80} thickness={3} />
        </MuiBox>
      )}
      <Typography variant="h3" component="h1">
        Tranzakcje:
      </Typography>

      <Typography variant="h4" component="h2">
        Incomes
      </Typography>

      {incomes.map(({ id, amount, description, date }) => (
        <Card
          key={id}
          sx={{
            background: (theme) =>
              `linear-gradient(25deg, ${theme.palette.success.light} -250%, #fff 50%)`,
            backgroundColor: (theme) => theme.palette.success.light,
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {date ? format(new Date(date), 'yyyy-MM-dd') : ''}
            </Typography>
            <Typography
              component="div"
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Typography variant="h5" component="span">
                {description} -
              </Typography>
              <Typography component="span" sx={{ color: 'text.secondary' }}>
                {amount} zł
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                void (async () => {
                  await deleteIncome({ id });
                  await refetchIncomes();
                })();
              }}
              loading={deletingIncome}
              color="error"
              size="small"
            >
              Usuń
            </Button>
          </CardActions>
        </Card>
      ))}

      <Typography variant="h4" component="h2">
        Expenses
      </Typography>

      {expenses.map(({ id, amount, description, date }) => (
        <Card
          key={id}
          sx={{
            background: (theme) =>
              `linear-gradient(25deg, ${theme.palette.error.light} -250%, #fff 50%)`,
            backgroundColor: (theme) => theme.palette.error.light,
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {date ? format(new Date(date), 'yyyy-MM-dd') : ''}
            </Typography>
            <Typography
              component="div"
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Typography variant="h5" component="span">
                {description} -
              </Typography>
              <Typography component="span" sx={{ color: 'text.secondary' }}>
                {amount} zł
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                void (async () => {
                  await deleteExpense({ id });
                  await refetchExpesnes();
                })();
              }}
              loading={deletingExpense}
              color="error"
              size="small"
            >
              Usuń
            </Button>
          </CardActions>
        </Card>
      ))}
    </Paper>
  );
};
export default TransactionHistory;
