export interface CustomError {
  name: string;
  message: string;
  stack?: string;
  status: number;
  errors: never[];
}
