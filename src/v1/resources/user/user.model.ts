import Config from '@config';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  firstName: String,
  lastName: String,
}, Config.sharedConfig.modelOptions);

export default mongoose.model<User>('User', userSchema);
