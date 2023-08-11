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
