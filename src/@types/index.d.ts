export {};

declare global {
  namespace Express {
    export interface Request {
      operation: (args?: any) => Promise<any>;
      args?: any;
      message?: string;
      successCode?: number;
      user?: User;
      token?: string;
    }

    export interface Response {
      exec: () => void;
    }
  }

  export interface TokenPayload {
    user?: User;
    iat?: number;
    exp?: number;
  }
}
