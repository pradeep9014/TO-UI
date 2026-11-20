import { Menu, LogOut, CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 backdrop-blur-md px-4 lg:px-6 dark:bg-surface-900/80 dark:border-surface-800">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 transition-colors lg:hidden dark:text-surface-400 dark:hover:bg-surface-800"
        >
          <Menu className="h-5 w-5" />
        </button>
        <a href="/index.html" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            <CheckSquare className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-surface-900 dark:text-white hidden sm:inline">
            {APP_NAME}
          </span>
        </a>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* User avatar + name */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-sm dark:bg-primary-900/40 dark:text-primary-300">
            {user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="font-medium max-w-[120px] truncate">
            {user?.name || user?.username || 'User'}
          </span>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-surface-600 hover:bg-red-50 hover:text-red-600 transition-colors dark:text-surface-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
