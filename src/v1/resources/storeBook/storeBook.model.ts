import Config from '@config';
import mongoose from 'mongoose';

const storeBookSchema = new mongoose.Schema({
  price: Number,
  quantity: Number,
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
  },
  store: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
  },
}, Config.sharedConfig.modelOptions);

export default mongoose.model<StoreBook>('StoreBook', storeBookSchema);
