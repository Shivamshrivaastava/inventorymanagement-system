
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  lowInventory: boolean;
  image?: string;
  title: string;
  quantity: number;
  imageUrl: string;
}
