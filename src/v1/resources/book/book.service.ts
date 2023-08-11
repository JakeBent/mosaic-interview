import { Service } from '@base';

export default class BookService extends Service {
  public create = async ({
    isbn,
    author,
    title,
    genre,
    publicationDate,
    price,
    quantity,
  }: BookCreateDTO) => {
    const existingBook = await this.Book.findOne({ isbn });

    if (existingBook) {
      existingBook.quantity += 1;
      await existingBook.save();
      return existingBook;
    }

    const book = await this.Book.create({
      isbn,
      author,
      title,
      genre,
      publicationDate: new Date(publicationDate),
      price,
      quantity,
    });

    return book;
  };
}
