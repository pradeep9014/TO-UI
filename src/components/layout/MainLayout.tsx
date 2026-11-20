import { useState, type ReactNode } from 'react';
import Header from './Header';
import Sidebar, { type SidebarFilter } from './Sidebar';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
  children: (props: { sidebarFilter: SidebarFilter }) => ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilter>('all');

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          style: { background: '#1e293b', color: '#f1f5f9' },
        }}
      />
      <div className="flex flex-1 min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeFilter={sidebarFilter}
          onFilterChange={setSidebarFilter}
        />
        <div className="flex flex-1 flex-col min-w-0">
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">{children({ sidebarFilter })}</main>
        </div>
      </div>
    </div>
  );
}
