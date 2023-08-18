import { Service } from '@base';

export default class StoreService extends Service {
  public create = async ({
    name,
    location,
  }: StoreCreateDTO) => {
    const store = await this.Store.create({ name, location });

    return store;
  };

  public add = async ({
    storeId,
    bookId,
    quantity,
    price,
  }: StoreAddDTO) => {
    const book = await this.Book.findById(bookId);

    if (!book) {
      throw new Error('Book does not exist');
    }

    const existingRecord = await this.StoreBook.findOne({ store: storeId, book: bookId });

    if (existingRecord) {
      existingRecord.quantity = quantity;
      existingRecord.price = price;
      await existingRecord.save();

      return existingRecord;
    }

    const record = await this.StoreBook.create({
      store: storeId,
      book: bookId,
      quantity,
      price,
    });

    await this.Store.findByIdAndUpdate(
      storeId,
      { $addToSet: { storeBooks: record } },
    );

    await this.Book.findByIdAndUpdate(
      bookId,
      { $addToSet: { storeBooks: record } },
    );

    return record;
  };
}
