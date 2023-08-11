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
    orgName,
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

    let org = await this.Organization.findOne({ name: orgName });

    if (org) {
      org.requestedMembers.addToSet(user.id);
      await org.save();
    } else {
      org = await this.Organization.create({
        name: orgName,
        admins: [user.id],
      });

      user.organizations.addToSet(org.id);
      await user.save();
    }

    const payload: TokenPayload = { user, activeOrg: org };
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
      organizations,
    } = user;

    if (!hash) {
      throw new IncorrectAuthError();
    }

    if (!bcrypt.compareSync(password, hash)) {
      throw new IncorrectAuthError();
    }

    const payload: TokenPayload = { user };

    if (organizations.length > 0) {
      const org = await this.Organization.findById(organizations[0]);
      if (org) {
        payload.activeOrg = org;
      }
    }

    const token = jwt.sign(
      payload,
      this.config.jwtSecret,
      this.config.jwtOptions,
    );

    return token;
  };

  public me = async ({ user }: UserMeDTO) => this.User.findById(user.id);
}
