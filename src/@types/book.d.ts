import { Document, Types } from 'mongoose';

export {};

declare global {
  export interface Book extends Document {
    isbn: string,
    author: string,
    title: string,
    genre: string,
    publicationDate: Date,
    price?: number,
    quantity?: number,
    storeBooks: Types.DocumentArray<StoreBook>,
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

  export interface BookDeleteDTO {
    bookId: string;
  }

  export interface BookSearchDTO {
    page: number;
    pageSize: number;
    isbn?: string,
    author?: string,
    title?: string,
    genre?: string,
    publicationDate?: Date,
    price?: number,
    quantity?: number,
  }

  export interface BookSearchQuery {
    isbn?: string,
    author?: { $regex: string, $options: string },
    title?: { $regex: string, $options: string },
    genre?: { $regex: string, $options: string },
    publicationDate?: date,
    price?: number,
    quantity?: number,
  }
}
