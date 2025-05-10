import { Outlet } from 'react-router';

import { Box } from '@mui/material';

// TODO: Finish me
const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
