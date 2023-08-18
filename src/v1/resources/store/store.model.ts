import Config from '@config';
import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: String,
  location: String,
  storeBooks: {
    type: mongoose.Types.ObjectId,
    ref: 'StoreBook',
  },
}, Config.sharedConfig.modelOptions);

export default mongoose.model<Store>('Store', storeSchema);
