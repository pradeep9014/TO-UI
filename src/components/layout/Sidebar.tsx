import {
  LayoutDashboard,
  Clock,
  Loader2,
  CheckCircle2,
  X,
} from 'lucide-react';

export type SidebarFilter = 'all' | 'pending' | 'inprogress' | 'completed';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: SidebarFilter;
  onFilterChange: (filter: SidebarFilter) => void;
}

const navItems: { key: SidebarFilter; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { key: 'pending', label: 'Pending', icon: <Clock className="h-5 w-5" /> },
  { key: 'inprogress', label: 'In Progress', icon: <Loader2 className="h-5 w-5" /> },
  { key: 'completed', label: 'Completed', icon: <CheckCircle2 className="h-5 w-5" /> },
];

export default function Sidebar({ isOpen, onClose, activeFilter, onFilterChange }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-white border-r border-surface-200 transition-transform duration-300 ease-in-out dark:bg-surface-900 dark:border-surface-800 lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile close */}
        <div className="flex h-16 items-center justify-between border-b border-surface-200 px-4 lg:hidden dark:border-surface-800 shrink-0">
          <span className="text-lg font-bold text-surface-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Spacer for desktop — align with header */}
        <div className="hidden lg:block h-16 border-b border-surface-200 dark:border-surface-800 shrink-0" />

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-surface-400 dark:text-surface-500">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = item.key === activeFilter;

            return (
              <button
                key={item.label}
                onClick={() => {
                  onFilterChange(item.key);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
