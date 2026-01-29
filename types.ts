
export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  image: string;
  gallery?: string[];
  category: string;
  features: string[];
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
}