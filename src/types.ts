export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  reviews?: Review[];
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
