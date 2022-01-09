export interface Response<T> {
  status_code: number;
  msg: string;
  data: T;
}
