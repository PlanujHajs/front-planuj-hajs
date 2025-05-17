import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material';
import router from './lib/router';
import { theme } from './lib/consts/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </QueryClientProvider>
  );
}


export default App;
