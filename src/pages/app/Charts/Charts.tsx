import { useListExpensesExpensesGet } from '@/api/expenses/expenses';
import { useListIncomesIncomesGet } from '@/api/incomes/incomes';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Button from '@mui/material/Button';
import { Paper, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';

const COLORS = ['#e57373', '#64b5f6'];

const Charts = () => {
  const { data: expenses = [] } = useListExpensesExpensesGet();
  const { data: incomes = [] } = useListIncomesIncomesGet();

  const pieData = useMemo(() => {
    // Suma wydatków i przychodów
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncomes = incomes.reduce((sum, i) => sum + i.amount, 0);

    // Dane do wykresu kołowego
    return [
      { name: 'Wydatki', value: totalExpenses },
      { name: 'Przychody', value: totalIncomes },
    ];
  }, [expenses, incomes]);

  // Eksport do CSV
  const handleExportCSV = useCallback(() => {
    const header = 'typ,kwota\n';
    const rows = pieData
      .map((row) => `${row.name},${row.value.toString()}`)
      .join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'podsumowanie.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }, [pieData]);

  return (
    <Paper sx={{ padding: '2rem' }}>
      <Typography variant="h3" component="h1">
        Podsumowanie finansowe
      </Typography>
      <Button variant="contained" onClick={handleExportCSV} sx={{ my: 2 }}>
        Eksportuj do CSV
      </Button>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
          >
            {pieData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toString()} zł`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};
export default Charts;
