import { Request } from "express";

export interface ModifiedReq extends Request {
  decoded: {
    username: string;
    role: string;
  };
}
