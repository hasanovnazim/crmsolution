export interface Column<T> {
  name: keyof T;
  searchValue: string;
  isSearchVisible: boolean;
  displayName: string;
  start: string;
  end: string;
  min: number;
  max: number;
  isColumn?: boolean;
  hasNotFilter?: boolean;
  isText?: boolean;
  isRange?: boolean;
  isDate?: boolean;
  isDropdown?: boolean;
}
