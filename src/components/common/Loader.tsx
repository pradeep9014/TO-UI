import { Loader2 } from 'lucide-react';

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400" />
      <p className="text-sm text-surface-500 dark:text-surface-400">{text}</p>
    </div>
  );
}
