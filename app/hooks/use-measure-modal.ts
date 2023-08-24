import { create } from "zustand";

interface MeasureModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMeasureModal = create<MeasureModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMeasureModal;
