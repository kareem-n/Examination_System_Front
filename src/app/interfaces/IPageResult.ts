export interface IPageResult<T> {
  count: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
  pageSize: number;
  items: T[];
}
