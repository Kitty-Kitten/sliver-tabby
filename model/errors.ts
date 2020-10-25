import { BASE_HTTP_CODE } from './code';

export interface IBaseError {
  code: BASE_HTTP_CODE;
  message: string;
}
