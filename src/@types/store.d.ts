import { Document, Types } from 'mongoose';

export {};

declare global {
  export interface Store extends Document {
    name: string,
    location: string,
    storeBooks: Types.ObjectId,
  }

  export interface StoreBook extends Document {
    price: number,
    quantity: number,
    book: Types.ObjectId,
  }
}
