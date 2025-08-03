import { Request } from "express";

export type IdParams = {
  id: string;
};

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
