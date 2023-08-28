import { create } from "zustand";

interface PersonalDataStore {
  personalData: { height: number; gender: string } | null;
  setPersonalData: (personalData: { height: number; gender: string }) => void;
}

const usePersonalData = create<PersonalDataStore>((set) => ({
  personalData: null,
  setPersonalData: (personalData: { height: number; gender: string }) =>
    set({ personalData }),
}));

export default usePersonalData;
