
export enum UserRole {
  RETAIL = 'Retail',
  WHOLESALE = 'Wholesale',
}

export enum ProductCategory {
  MILK = 'Milk',
  YOGURT = 'Yogurt',
  CHEESE = 'Cheese',
  BUTTER = 'Butter',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  price_unit: number; // Price for a single item
  price_carton: number; // Price for a full carton
  carton_size: number; // Number of units in a carton
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  // Price is determined at checkout based on user role and quantity
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}
