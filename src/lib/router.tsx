import { createBrowserRouter, Navigate } from 'react-router';
import { AuthProvider } from '../context/auth/AuthContext';
import {
  requireAuth,
  requireGuest,
  loginAction,
  logoutAction,
} from './authLoaders';
import ROUTES from './consts/routes';

import RootLayout from '../pages/layouts/RootLayout';
import AuthLayout from '../pages/layouts/AuthLayout';
import AppLayout from '../pages/layouts/AppLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Desktop from '../pages/app/Desktop';
import Charts from '../pages/app/Charts';
import AddTransaction from '../pages/app/AddTransaction';
import TransactionHistory from '../pages/app/TransactionHistory';

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.AUTH.LOGIN.URL} />,
      },
      {
        path: ROUTES.AUTH.PATH,
        element: <AuthLayout />,
        loader: requireGuest,
        children: [
          { index: true, element: <Navigate to={ROUTES.AUTH.LOGIN.URL} /> },
          {
            path: ROUTES.AUTH.LOGIN.URL,
            element: <Login />,
            action: loginAction,
          },
          { path: ROUTES.AUTH.REGISTER.URL, element: <Register /> },
          {
            path: ROUTES.AUTH.FORGOT_PASSWORD.URL,
            element: <ForgotPassword />,
          },
          { path: ROUTES.AUTH.RESET_PASSWORD.URL, element: <ResetPassword /> },
        ],
      },
      {
        path: ROUTES.APP.PATH,
        element: <AppLayout />,
        loader: requireAuth,
        children: [
          { path: ROUTES.APP.DESKTOP.URL, element: <Desktop /> },
          { path: ROUTES.APP.CHARTS.URL, element: <Charts /> },
          { path: ROUTES.APP.ADD_TRANSACTION.URL, element: <AddTransaction /> },
          {
            path: ROUTES.APP.TRANSACTION_HISTORY.URL,
            element: <TransactionHistory />,
          },
          { path: 'logout', action: logoutAction },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
