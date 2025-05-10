import { Outlet } from 'react-router';

import { Box } from '@mui/material';

import { theme } from '@/lib/consts/theme';

const RootLayout = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: theme.palette.background.default,
      }}
    >
      <Outlet />
    </Box>
  );
};

export default RootLayout;
