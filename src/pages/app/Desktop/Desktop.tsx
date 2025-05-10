import { Divider } from '@mui/material';
import Box from '@mui/material/Box';

import AddTransaction from '../AddTransaction';
import Charts from '../Charts';
import TransactionHistory from '../TransactionHistory';

// TODO: PLACEHOLDER, ADD FORM PAGE
const Desktop = () => (
  <Box sx={{ display: 'flex', gap: '2rem' }}>
    <AddTransaction /> <Divider />
    <TransactionHistory /> <Divider orientation="vertical" />
    <Charts />
  </Box>
);
export default Desktop;
