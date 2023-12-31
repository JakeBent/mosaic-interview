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

  public update = async ({
    bookId,
    isbn,
    author,
    title,
    genre,
    publicationDate,
    price,
    quantity,
  }: BookUpdateDTO) => {
    const book = await this.Book.findByIdAndUpdate(
      bookId,
      {
        isbn,
        author,
        title,
        genre,
        publicationDate: new Date(publicationDate),
        price,
        quantity,
      },
      { new: true },
    );

    return book;
  };

  public search = async ({
    page = 0,
    pageSize = 10,
    isbn,
    author,
    title,
    genre,
    publicationDate,
    price,
    quantity,
  }: BookSearchDTO) => {
    const query: BookSearchQuery = {};

    if (isbn) query.isbn = isbn;
    if (author) query.author = { $regex: `.*${author}.*`, $options: 'i' };
    if (title) query.title = { $regex: `.*${title}.*`, $options: 'i' };
    if (genre) query.genre = { $regex: `.*${genre}.*`, $options: 'i' };
    if (publicationDate) query.publicationDate = publicationDate;
    if (price) query.price = price;
    if (quantity) query.quantity = quantity;

    const count = await this.Book.countDocuments(query);

    const results = await this.Book
      .find(query)
      .populate({
        path: 'storeBooks',
        populate: {
          path: 'store',
        },
      })
      .limit(pageSize)
      .skip(page);

    return {
      page: +page,
      count,
      books: results,
    };
  };

  public delete = async ({
    bookId,
  }: BookDeleteDTO) => {
    // Should i potentially just decrement quantity if
    // the book has a quantity greater than 1?

    await this.Book.findByIdAndDelete(bookId);

    return 'OK';
  };
}
