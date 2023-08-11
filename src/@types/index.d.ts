export {};

declare global {
  namespace Express {
    export interface Request {
      operation: (args?: any) => Promise<any>;
      args?: any;
      message?: string;
      successCode?: number;
      user?: User;
      activeOrg?: Organization;
      token?: string;
    }

    export interface Response {
      exec: () => void;
    }
  }

  export interface TokenPayload {
    user?: User;
    activeOrg?: Organization;
    iat?: number;
    exp?: number;
  }
}
