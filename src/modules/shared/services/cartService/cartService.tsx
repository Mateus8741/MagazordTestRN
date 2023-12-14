import { StoreDTO } from '@dtos';
import { create } from 'zustand';

interface CartStore {
  products: Array<StoreDTO & { quantity: number }>;
  addProduct: (product: StoreDTO) => void;
  reduceProduct: (product: StoreDTO) => void;
  clearCart: () => void;
  items: number;
}

const useCartStore = create<CartStore>(set => ({
  products: [],
  items: 0,
  addProduct: product =>
    set(state => {
      state.items++;
      const productExists = state.products.find(item => item.id === product.id);

      if (productExists) {
        return {
          products: state.products.map(item => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        };
      } else {
        return { products: [...state.products, { ...product, quantity: 1 }] };
      }
    }),
  reduceProduct: product =>
    set(state => {
      return {
        products: state.products
          .map(item => {
            if (item.id === product.id) {
              state.items--;
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter(item => item.quantity > 0),
      };
    }),
  clearCart: () =>
    set(() => {
      return {
        items: 0,
        products: [],
      };
    }),
}));

export function useCart() {
  const { products, items, addProduct, reduceProduct, clearCart } =
    useCartStore();

  return { products, items, addProduct, reduceProduct, clearCart };
}