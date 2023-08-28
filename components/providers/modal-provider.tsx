"use client";

import { useEffect, useState } from "react";
import MeasureModal from "../modals/measure-modal";
import ModifyMeasureModal from "../modals/modify-measure-modal";
import InfoModal from "../modals/info-modal";

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
      <InfoModal />
      <ModifyMeasureModal />
      <MeasureModal />
    </>
  );
};
