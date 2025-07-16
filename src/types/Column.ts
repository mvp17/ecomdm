export type Column<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};
