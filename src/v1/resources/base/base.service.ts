import mongoose from 'mongoose';
import Config from '@config';
import User from '@v1/resources/user/user.model';
import Book from '@v1/resources/book/book.model';
import Store from '@v1/resources/store/store.model';
import StoreBook from '../storeBook/storeBook.model';

export default abstract class Service {
  public config = new Config();
  public mongoose = mongoose;
  public User = User;
  public Book = Book;
  public Store = Store;
  public StoreBook = StoreBook;
}
