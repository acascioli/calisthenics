import { create } from "zustand";

interface SelectedMeasureStore {
  selectedId: number;
  setSelectedId: (selectedId: number) => void;
}

const useSelectedId = create<SelectedMeasureStore>((set) => ({
  selectedId: 0,
  setSelectedId: (selectedId: number) => set({ selectedId }),
}));

export default useSelectedId;
