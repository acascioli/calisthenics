import { create } from "zustand";

interface ModifyMeasureModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModifyMeasureModal = create<ModifyMeasureModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useModifyMeasureModal;
