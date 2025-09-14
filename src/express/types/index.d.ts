import { User } from "../../models/User"; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}
