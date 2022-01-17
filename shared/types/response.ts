export interface SuccessResponse<T = unknown> {
  msg: string;
  data: T;
}

export interface ErrorResponse {
  detail: ErrorDetail[];
}

export interface ErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}
