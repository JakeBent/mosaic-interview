/* eslint-disable no-plusplus */

import Chance from 'chance';
import mongoose from 'mongoose';
import Config from '@config';
import Book from '@v1/resources/book/book.model';
import logger from '@logger';

const chance = new Chance();

const genres = [
  'action',
  'thriller',
  'suspense',
  'detective',
  'self-help',
  'cooking',
  'non-fiction',
];

const randomGenre = () => genres[Math.floor(Math.random() * genres.length)];

const run = async () => {
  const { mongoUri } = Config.sharedConfig;
  logger.info('connecting to mongo server...');
  await mongoose.connect(mongoUri);
  logger.success(`connected to mongo at ${mongoUri}`);

  logger.info('seeding books...');

  const bookInfos = [];
  for (let i = 0; i < 100; i++) {
    const bookInfo = {
      isbn: chance.integer({
        min: 1000000000000,
        max: 9999999999999,
      }),
      author: chance.name(),
      title: chance.sentence(),
      genre: randomGenre(),
      publicationDate: chance.date(),
      price: chance.floating({ min: 1, max: 200 }),
      quantity: chance.integer({ min: 1 }),
    };

    bookInfos.push(bookInfo);
  }

  const books = await Book.create(bookInfos);

  logger.success(`created ${books.length} books`);

  process.exit(0);
};

run();
