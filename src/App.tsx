// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@mui/material';
import router from './lib/router';
import { theme } from './lib/consts/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const queryClient = new QueryClient({});

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);


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
