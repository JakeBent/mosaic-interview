import { Document, Types } from 'mongoose';

export {};

declare global {
  export interface Store extends Document {
    name: string,
    location: string,
    storeBooks: Types.DocumentArray<StoreBook>,
  }

  export interface StoreCreateDTO {
    name: string,
    location: string,
  }

  export interface StoreAddDTO {
    storeId: string,
    bookId: string,
    quantity: number,
    price: number,
  }

  export interface StoreBook extends Document {
    price: number,
    quantity: number,
    book: Types.ObjectId,
    store: Types.ObjectId,
  }
}
