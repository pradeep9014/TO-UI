export const APP_NAME = 'TaskFlow';

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'updatedAt', label: 'Updated Date' },
  { value: 'title', label: 'Alphabetical' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
] as const;
