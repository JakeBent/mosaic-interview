import { Resource } from '@base';
import Ping from './resources/ping';
import User from './resources/user';
import Book from './resources/book';
import Store from './resources/store';

export default class V1 extends Resource {
  public prefix = '/v1';
  public resources: Resource[] = [
    new Ping(),
    new User(),
    new Book(),
    new Store(),
  ];

  public setupRoutes(): void {
    this.resources.forEach((resource: Resource) => {
      this.router.use(resource.prefix, resource.routes());
    });
  }
}
