// store/counterStore.ts
import { create } from 'zustand';

// Define the shape of your state and actions
interface UtilState {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

// Create the store with types
const useUtilStore = create<UtilState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useUtilStore;