import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...rest }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-surface-700 dark:text-surface-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-surface-900 placeholder-surface-400 transition-colors duration-150 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-surface-100 disabled:cursor-not-allowed dark:bg-surface-800 dark:border-surface-600 dark:text-surface-100 dark:placeholder-surface-500 dark:focus:border-primary-400 dark:focus:ring-primary-400/20 resize-none ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-surface-300'
          } ${className}`}
          {...rest}
        />
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
