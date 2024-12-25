import { Response } from 'express';
import { TResponse } from './utils.interface';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    token:data.token,
    data: data.data,

  });
};

export default sendResponse;