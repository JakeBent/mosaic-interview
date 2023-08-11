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

  public update = async (req: Request, res: Response) => {
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
      params: {
        bookId,
      },
    } = req;

    req.message = 'Updated book';
    req.operation = this.service.update;
    req.args = {
      bookId,
      isbn,
      author,
      title,
      genre,
      publicationDate,
      price,
      quantity,
    };

    res.exec();
  };

  public search = async (req: Request, res: Response) => {
    const {
      query: {
        page,
        pageSize,
        isbn,
        author,
        title,
        genre,
        publicationDate,
        price,
        quantity,
      },
    } = req;

    req.message = 'Searched books';
    req.operation = this.service.search;
    req.args = {
      page,
      pageSize,
      isbn,
      author,
      title,
      genre,
      publicationDate,
      price,
      quantity,
    };

    res.exec();
  };

  public delete = async (req: Request, res: Response) => {
    const {
      params: { bookId },
    } = req;

    req.message = 'Deleted book';
    req.operation = this.service.delete;
    req.args = { bookId };

    res.exec();
  };
}
