import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
if (rootElement)
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
else console.error('Root element not found');
