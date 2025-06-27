import { create } from 'zustand';

interface PlaceStore {
  place: string;
  setPlace: (newPlace: string) => void;
}

export const usePlaceStore = create<PlaceStore>((set) => ({
  place: 'Hanoi',
  setPlace: (newPlace: string) => set({ place: newPlace }),
}));