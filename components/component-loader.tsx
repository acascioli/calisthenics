"use client";

import { PuffLoader } from "react-spinners";

const ComponentLoader = () => {
  return (
    <div
      className="
      h-full
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader size={100} color="green" />
    </div>
  );
};

export default ComponentLoader;
