import { Resource } from '@base';
import StoreController from './store.controller';

export default class Book extends Resource {
  public prefix = '/stores';
  private controller = new StoreController();

  public setupRoutes(): void {
    this.router.post('/', this.controller.create);
    this.router.post('/:storeId/add', this.controller.add);
  }
}
