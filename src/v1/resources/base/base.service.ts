import mongoose from 'mongoose';
import Config from '@config';
import User from '@v1/resources/user/user.model';
import Book from '@v1/resources/book/book.model';

export default abstract class Service {
  public config = new Config();
  public mongoose = mongoose;
  public User = User;
  public Book = Book;
}
