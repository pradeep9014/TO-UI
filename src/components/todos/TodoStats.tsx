import type { ReactNode } from 'react';

interface TodoStatsProps {
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 transition-shadow hover:shadow-md dark:bg-surface-800 dark:border-surface-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
            {label}
          </p>
          <p className="mt-1 text-3xl font-bold text-surface-900 dark:text-white">
            {value}
          </p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function StatsSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-surface-200 bg-white p-5 dark:bg-surface-800 dark:border-surface-700"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-8 w-12" />
            </div>
            <div className="skeleton h-12 w-12 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TodoStats({ stats }: TodoStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Tasks"
        value={stats.total}
        color="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
      />
      <StatCard
        label="Pending"
        value={stats.pending}
        color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <StatCard
        label="In Progress"
        value={stats.inProgress}
        color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  );
}
