import { Document, Types } from 'mongoose';

export {};

declare global {
  export interface StoreBook extends Document {
    price: number,
    quantity: number,
    book: Types.ObjectId,
  }
}
