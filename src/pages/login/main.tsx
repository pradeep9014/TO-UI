import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './Login';
import '../../index.css';
import { redirectIfAuthenticated } from '../../utils/protect-route';

if (!redirectIfAuthenticated()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Login />
    </StrictMode>,
  );
}
