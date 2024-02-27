import { User } from "./User";

export interface GroceryItem {
  id: number;
  barcodeNumber: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  lastUpdatedBy: User;
  createdAt?: Date;
  updatedAt?: Date;
}
