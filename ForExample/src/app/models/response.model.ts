export interface ResponsePayload<T> {
  code: number;
  data: Data<T>;
  message: string;
  timeStamp: string;
}
export interface Data<T> {
  result: T[];
  count: number;
}
export interface ResponseError {
  error: any;
}
