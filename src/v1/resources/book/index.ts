import { Resource } from '@base';
import BookController from './book.controller';

export default class Book extends Resource {
  public prefix = '/books';
  private controller = new BookController();

  public setupRoutes(): void {
    this.router.post('/', this.controller.create);
    this.router.patch('/:bookId', this.controller.update);
  }
}
