export interface ResponsePayload<T> {
  data: T;
}
export interface List<T> {
  result: T[];
}
export interface ResponseError {
  error: any;
}
