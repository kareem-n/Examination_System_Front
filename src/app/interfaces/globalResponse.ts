export interface IGlobalResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: [];
}
