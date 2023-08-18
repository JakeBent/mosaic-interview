import { Request, Response } from 'express';
import { Controller } from '@base';
import StoreService from './store.service';

export default class StoreController extends Controller {
  public service = new StoreService();

  public create = async (req: Request, res: Response) => {
    const {
      body: {
        name,
        location,
      },
    } = req;

    req.message = 'Created store';
    req.operation = this.service.create;
    req.args = {
      name,
      location,
    };
    req.successCode = 201;

    res.exec();
  };

  public add = async (req: Request, res: Response) => {
    const {
      params: { storeId },
      body: {
        bookId,
        quantity,
        price,
      },
    } = req;

    req.message = 'Updated book record';
    req.operation = this.service.add;
    req.args = {
      storeId,
      bookId,
      quantity,
      price,
    };
    req.successCode = 201;

    res.exec();
  };
}
