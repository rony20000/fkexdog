export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  publicId?: string;
}

export interface WishlistWithItems extends Wishlist {
  items: Product[];
}

export interface WishlistItem {
  wishlistId: string;
  productId: string;
  priceAtAdd: number;
}

export interface WishlistProduct extends Product {
  priceAtAdd: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
