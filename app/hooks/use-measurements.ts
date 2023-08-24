import { Measurements } from "@/schemas/measurements-schema";
import { create } from "zustand";

interface MeasurementsStore {
  measurements: Measurements[] | null;
  setMeasurements: (measurements: Measurements[]) => void;
}

const useMeasurements = create<MeasurementsStore>((set) => ({
  measurements: null,
  setMeasurements: (measurements: Measurements[]) => set({ measurements }),
}));

export default useMeasurements;
