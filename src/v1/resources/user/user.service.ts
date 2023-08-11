import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Service } from '@base';
import {
  DuplicateUserError,
  IncorrectAuthError,
} from '@common/errors';

export default class UserService extends Service {
  public signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: UserSignupDTO) => {
    const existingUser = await this.User.findOne({ email });

    if (existingUser) {
      throw new DuplicateUserError();
    }

    const user = await this.User.create({
      email,
      password: bcrypt.hashSync(password, this.config.salt),
      firstName,
      lastName,
    });

    const payload: TokenPayload = { user };
    const token = jwt.sign(
      payload,
      this.config.jwtSecret,
      this.config.jwtOptions,
    );

    return token;
  };

  public login = async ({
    email,
    password,
  }: UserLoginDTO) => {
    const user = await this.User.findOne({ email });

    if (!user) {
      throw new IncorrectAuthError();
    }

    const {
      password: hash,
    } = user;

    if (!hash) {
      throw new IncorrectAuthError();
    }

    if (!bcrypt.compareSync(password, hash)) {
      throw new IncorrectAuthError();
    }

    const payload: TokenPayload = { user };

    const token = jwt.sign(
      payload,
      this.config.jwtSecret,
      this.config.jwtOptions,
    );

    return token;
  };

  public me = async ({ user }: UserMeDTO) => this.User.findById(user.id);
}
