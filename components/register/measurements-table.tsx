"use client";

import { useAuth } from "@clerk/nextjs";
import { DataTable } from "./data-table";
import { supabaseClient } from "@/lib/superbase-client";
import { columns } from "./columns";
import { useContext, useEffect, useState } from "react";
import useMeasureModal from "@/app/hooks/use-measure-modal";
import useMeasurements from "@/app/hooks/use-measurements";
import PageLoader from "../page-loader";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function MeasurementsTable() {
  const { getToken, userId, orgId } = useAuth();
  const [loading, setLoading] = useState(true);
  const measureModal = useMeasureModal();
  const { measurements, setMeasurements } = useMeasurements();

  // on first load, fetch and set tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        if (measurements == null || measurements == undefined) {
          const supabaseAccessToken = await getToken({
            template: "supabase",
          });
          const supabase = await supabaseClient(supabaseAccessToken!);
          const { data } = await supabase
            .from("measurements")
            .select("*")
            .order("measure_date", { ascending: false });
          setMeasurements(data!);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [getToken, measurements, setMeasurements]);

  // if loading, just show basic message
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {measurements!.length > 0 ? (
        <DataTable data={measurements!} columns={columns} />
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-center m-8">
            No entries found.
          </h2>
          <Button
            variant="premium"
            onClick={measureModal.onOpen}
            size="sm"
            className="h-8 border-dashed mr-2"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add measurement
          </Button>
        </div>
      )}
    </>
  );
}
