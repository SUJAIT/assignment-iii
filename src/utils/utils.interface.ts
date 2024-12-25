
export interface TResponse<T>  {

  statusCode: number
  success: boolean
  message?: string
  data: T | T[] |null
  status?:boolean
  token?:string
};