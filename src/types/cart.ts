export interface CartItem {
  teaId: number;
  teaName: string;
  weight: 20 | 50 | 100 | 500;
  price: number;
  quantity: number;
  image: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (teaId: number, teaName: string, weight: 20 | 50 | 100 | 500, price: number, image: string) => void;
  removeItem: (teaId: number, weight: 20 | 50 | 100 | 500) => void;
  updateQuantity: (teaId: number, weight: 20 | 50 | 100 | 500, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
