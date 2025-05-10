import { Outlet } from 'react-router';

import { Paper, Typography } from '@mui/material';

// TODO: Finish mobile design
const AuthLayout = () => {
  return (
    <>
      <Typography variant="h2" component="h1" sx={{ margin: '2rem auto' }}>
        <Typography
          variant="inherit"
          component="b"
          sx={{ color: 'primary.main', fontWeight: 'bold' }}
        >
          $$
        </Typography>{' '}
        Planuj hajs
      </Typography>
      <Paper
        elevation={4}
        sx={{ padding: '2rem', width: '27.5rem', maxWidth: '100%' }}
      >
        <Outlet />
      </Paper>
    </>
  );
};

export default AuthLayout;
