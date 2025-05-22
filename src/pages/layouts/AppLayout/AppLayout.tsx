import { Outlet } from 'react-router';

import { Box } from '@mui/material';

// TODO: Finish me
const AppLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
