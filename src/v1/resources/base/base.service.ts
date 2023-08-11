import mongoose from 'mongoose';
import Config from '@config';
import User from '@v1/resources/user/user.model';

export default abstract class Service {
  public config = new Config();
  public mongoose = mongoose;
  public User = User;
}
