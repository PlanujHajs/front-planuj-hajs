import { Divider, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { Form } from 'react-router';
import AddTransaction from '../AddTransaction';
import Charts from '../Charts';
import TransactionHistory from '../TransactionHistory';
import NotificationButton from '../../../components/form/NotificationButton';

// TODO: PLACEHOLDER, ADD FORM PAGE
const Desktop = () => (
  <Box sx={{ display: 'flex', gap: '2rem' }}>
    <AddTransaction /> <Divider />
    <TransactionHistory /> <Divider orientation="vertical" />
    <Charts />
    <Box sx={{ position: 'absolute', right: '2rem', top: '2rem' }}>
      <Form method="post" action="../logout">
        <Button type="submit" variant="outlined" color="secondary">
          Wyloguj
        </Button>
      </Form>
    </Box>
    <NotificationButton />
  </Box>
);
export default Desktop;
