export function TodoCardSkeleton() {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 dark:bg-surface-800 dark:border-surface-700">
      <div className="space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-20 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-24" />
        </div>
        <div className="border-t border-surface-100 pt-3 dark:border-surface-700">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="skeleton h-7 w-24 rounded-md" />
              <div className="skeleton h-7 w-20 rounded-md" />
            </div>
            <div className="flex gap-1">
              <div className="skeleton h-8 w-8 rounded-lg" />
              <div className="skeleton h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TodoListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <TodoCardSkeleton key={i} />
      ))}
    </div>
  );
}
