"use client";

import { useEffect, useState } from "react";
// import ThermalModal from "../modals/consumption/thermal-modal";
// import { AddTaskModal } from "../modals/tasks/add-task-modal";
// import ElectricalModal from "../modals/consumption/electrical-modal";
// import ModifyThermalConsumption from "../modals/consumption/modify-thermal-modal";
// import { ModifyTaskModal } from "../modals/tasks/modify-task-modal";
// import ModifyElectricalConsumption from "../modals/consumption/modify-electrical-modal";
// import WaterModal from "../modals/consumption/water-modal";
// import ModifyWaterConsumption from "../modals/consumption/modify-water-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Tasks */}
      {/* <ThermalModal />
      <ModifyThermalConsumption />
      <ElectricalModal />
      <ModifyElectricalConsumption />
      <WaterModal />
      <ModifyWaterConsumption /> */}
    </>
  );
};
