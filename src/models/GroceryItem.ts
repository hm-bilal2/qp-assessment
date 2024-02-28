import { User } from "./User";

export interface GroceryItem {
  id: number;
  barcodeNumber: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  lastUpdatedBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}
