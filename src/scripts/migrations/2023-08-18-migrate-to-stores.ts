/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

import mongoose from 'mongoose';
import Config from '@config';
import Book from '@v1/resources/book/book.model';
import Store from '@v1/resources/store/store.model';
import StoreBook from '@v1/resources/storeBook/storeBook.model';
import logger from '@logger';

const run = async () => {
  const { mongoUri } = Config.sharedConfig;
  logger.info('connecting to mongo server...');
  await mongoose.connect(mongoUri);
  logger.success(`connected to mongo at ${mongoUri}`);

  logger.info('migrating...');

  const store = await Store.findOne({});

  const books = await Book.find({});

  const bookStores = await Promise.all(books.map(async (book) => {
    const record = await StoreBook.create({
      price: book.price,
      quantity: book.quantity,
      book: book.id,
      store: store?.id,
    });

    book.storeBooks.addToSet(record);
    delete book.price;
    delete book.quantity;
    await book.save();

    store?.storeBooks.addToSet(record);
    await store?.save();
  }));

  logger.success(`created ${bookStores} book records`);

  process.exit(0);
};

run();
