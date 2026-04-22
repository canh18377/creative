export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  type: 'text' | 'products' | 'checkout_success';
  content: string;
  products?: Product[];
  timestamp: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
