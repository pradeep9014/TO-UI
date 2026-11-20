import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard';
import '../../index.css';
import { requireAuth } from '../../utils/protect-route';

if (requireAuth()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Dashboard />
    </StrictMode>,
  );
}
