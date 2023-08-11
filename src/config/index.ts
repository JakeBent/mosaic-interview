/* eslint-disable no-param-reassign */

import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default class Config {
  private static _sharedConfig: Config;

  // General
  public nodeEnv = nodeEnv;
  public port: number = Number(process.env.PORT) ?? 3001;
  public salt: number = Number(process.env.BCRYPT_SALT) ?? 10;
  public jwtSecret = process.env.JWT_SECRET ?? 'Mantequilla';
  public jwtOptions = { expiresIn: '72h' };

  // DB
  public mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/boilerplate';
  public modelOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_: any, result: any) => {
        delete result.password;
      },
    },
  };

  static get sharedConfig(): Config {
    if (!this._sharedConfig) {
      this._sharedConfig = new Config();
    }

    return this._sharedConfig;
  }
}
