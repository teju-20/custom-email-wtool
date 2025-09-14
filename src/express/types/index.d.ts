// src/express/types/index.d.ts
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      // add any other fields you store in user
    };
  }
}
export { Request } from 'express';