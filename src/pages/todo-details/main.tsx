import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TodoDetails from './TodoDetails';
import '../../index.css';
import { requireAuth } from '../../utils/protect-route';

if (requireAuth()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <TodoDetails />
    </StrictMode>,
  );
}
