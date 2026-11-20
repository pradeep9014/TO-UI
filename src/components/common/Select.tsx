import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...rest }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-surface-700 dark:text-surface-300"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-surface-900 transition-colors duration-150 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-surface-100 disabled:cursor-not-allowed dark:bg-surface-800 dark:border-surface-600 dark:text-surface-100 dark:focus:border-primary-400 dark:focus:ring-primary-400/20 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-surface-300'
          } ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
