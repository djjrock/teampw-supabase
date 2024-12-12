import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { validateEnv } from './lib/supabase/config';
import './index.css';
import './styles/theme.css';

// Validate environment variables before mounting
validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);