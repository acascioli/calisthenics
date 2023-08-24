"use client";

import { Heading } from "@/components/heading";
import { Database, UploadCloud, UploadIcon } from "lucide-react";
import axios from "axios";
import { useCallback, useState } from "react";
import * as xlsx from "xlsx";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import ComponentLoader from "@/components/component-loader";
// import * as fs from "fs";

export default function TrainingPage() {
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<{
    fileName: string;
    percentCompleted: number;
  }>();

  const onDrop = useCallback(async (files: any) => {
    // const reader = new FileReader();
    // reader.onload = async (event) => {
    //   const fileData = event.target!.result;

    //   try {
    //     const response = await axios.post("/api/converter", {
    //       method: "POST",
    //       body: fileData,
    //     });

    //     toast.success("Documenti caricati!");
    //   } catch (error) {
    //     toast.error("Qualcosa è andato storto.");
    //     console.error("Error:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // reader.readAsArrayBuffer(files[0]);

    const formData = new FormData();
    formData.append("file", files[0]);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target!.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      console.log(json);

      try {
        const response = await axios.post("/api/converter", {
          method: "POST",
          body: json,
        });

        toast.success("Documenti caricati!");
      } catch (error) {
        toast.error("Qualcosa è andato storto.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dragAreaClass =
    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600";
  const dragAreaClassActive =
    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500";

  return (
    <div>
      <Heading
        title="Converter"
        description="Convert your excel to json."
        icon={Database}
        iconColor="text-amber-700"
        bgColor="bg-amber-700/10"
      />
      <div className="px-4 md:px-8space-y-6">
        <div
          className={isDragActive ? dragAreaClassActive : dragAreaClass}
          {...getRootProps()}
        >
          <input {...getInputProps()} className="border border-red-500" />
          {isDragActive ? (
            <div className="flex flex-col">
              <UploadIcon className="text-gray-500 dark:text-gray-400 w-20 text-center m-auto" />
              <p className="text-center">Drop it...</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <UploadCloud className="text-gray-400 w-12 mb-4 text-center m-auto" />
              <p className="text-center font-semibold text-gray-500 dark:text-gray-400">
                Drag and drop or click to select...
              </p>
            </div>
          )}
          {loading && <ComponentLoader />}
        </div>
        <p className="mt-4 font-semibold">
          Note: save json in aws S3. Use folders named after the user_id.
        </p>
      </div>
    </div>
  );
}
