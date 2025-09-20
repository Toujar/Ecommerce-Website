export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  image_url: string;
  images: string[];
  category: string;
  brand: string;
  stock_quantity: number;
  rating: number;
  review_count: number;
  specifications: Record<string, string>;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Address;
  created_at: string;
  updated_at: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}