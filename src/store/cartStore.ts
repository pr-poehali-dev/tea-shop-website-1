import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore, CartItem } from '@/types/cart';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (teaId, teaName, weight, price, image) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.teaId === teaId && item.weight === weight
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.teaId === teaId && item.weight === weight
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { teaId, teaName, weight, price, quantity: 1, image }],
          });
        }
      },

      removeItem: (teaId, weight) => {
        set({
          items: get().items.filter(
            item => !(item.teaId === teaId && item.weight === weight)
          ),
        });
      },

      updateQuantity: (teaId, weight, quantity) => {
        if (quantity <= 0) {
          get().removeItem(teaId, weight);
          return;
        }

        set({
          items: get().items.map(item =>
            item.teaId === teaId && item.weight === weight
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
