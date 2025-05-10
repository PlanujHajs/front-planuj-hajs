import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { ThemeProvider } from '@mui/material';

import ROUTES from './lib/consts/routes';
import { theme } from './lib/consts/theme';
import AddTransaction from './pages/app/AddTransaction';
import Charts from './pages/app/Charts';
import Desktop from './pages/app/Desktop';
import TransactionHistory from './pages/app/TransactionHistory';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import AppLayout from './pages/layouts/AppLayout';
import AuthLayout from './pages/layouts/AuthLayout';
import RootLayout from './pages/layouts/RootLayout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT.URL,
    element: <RootLayout />,
    // loader: () => null,
    children: [
      {
        path: ROUTES.ROOT.URL,
        element: <Navigate to={ROUTES.AUTH.LOGIN.URL} />,
      },
      {
        path: ROUTES.APP.PATH,
        element: <AppLayout />,
        children: [
          {
            path: ROUTES.APP.ADD_TRANSACTION.URL,
            element: <AddTransaction />,
          },
          {
            path: ROUTES.APP.CHARTS.URL,
            element: <Charts />,
          },
          {
            path: ROUTES.APP.DESKTOP.URL,
            element: <Desktop />,
          },
          {
            path: ROUTES.APP.TRANSACTION_HISTORY.URL,
            element: <TransactionHistory />,
          },
        ],
      },
      {
        path: ROUTES.AUTH.PATH,
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.AUTH.LOGIN.URL} />,
          },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD.URL,
            element: <ForgotPassword />,
          },
          {
            path: ROUTES.AUTH.LOGIN.URL,
            element: <Login />,
          },
          {
            path: ROUTES.AUTH.REGISTER.URL,
            element: <Register />,
          },
          {
            path: ROUTES.AUTH.RESET_PASSWORD.URL,
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
]);

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
