import { Request, Response } from 'express';
import { Controller } from '@base';
import BookService from './book.service';

export default class BookController extends Controller {
  public service = new BookService();

  public create = async (req: Request, res: Response) => {
    const {
      body: {
        isbn,
        author,
        title,
        genre,
        publicationDate,
        price,
        quantity,
      },
    } = req;

    req.message = 'Created book';
    req.operation = this.service.create;
    req.args = {
      isbn,
      author,
      title,
      genre,
      publicationDate,
      price,
      quantity,
    };
    req.successCode = 201;

    res.exec();
  };
}