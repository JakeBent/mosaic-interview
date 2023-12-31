// ISBN, author, title, genre, publication date, price, quantity

import Config from '@config';
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  author: String,
  title: String,
  genre: String,
  publicationDate: Date,
  storeBooks: [{
    type: mongoose.Types.ObjectId,
    ref: 'StoreBook',
  }],
}, Config.sharedConfig.modelOptions);

export default mongoose.model<Book>('Book', bookSchema);
