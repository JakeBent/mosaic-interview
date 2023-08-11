import { Document } from 'mongoose';

export {};

declare global {
  export interface Book extends Document {
    isbn: string,
    author: string,
    title: string,
    genre: string,
    publicationDate: Date,
    price: number,
    quantity: number,
  }

  export interface BookCreateDTO {
    isbn: string,
    author: string,
    title: string,
    genre: string,
    publicationDate: Date,
    price: number,
    quantity: number,
  }

  export interface BookUpdateDTO {
    bookId: string;
    isbn: string,
    author: string,
    title: string,
    genre: string,
    publicationDate: Date,
    price: number,
    quantity: number,
  }
}
