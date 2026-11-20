interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-300 py-16 px-6 text-center dark:border-surface-700">
      {icon && (
        <div className="mb-4 text-surface-400 dark:text-surface-500">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-surface-500 dark:text-surface-400 max-w-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
