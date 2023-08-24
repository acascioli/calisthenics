"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@clerk/nextjs";
import { supabaseClient } from "@/lib/superbase-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { Measurements, measureSchema } from "@/schemas/measurements-schema";
import useModifyMeasureModal from "@/app/hooks/use-modify-measure-modal";
import useMeasurements from "@/app/hooks/use-measurements";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const measurementsRow = measureSchema.parse(row.original);
  const modifyMeasurements = useModifyMeasureModal();
  const { measurements, setMeasurements } = useMeasurements();

  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function modifyConsumption(id: number) {
    // setSelectedTasksID(id);
    modifyMeasurements.onOpen();
  }

  async function deleteTask(id: number) {
    setIsLoading(true);
    try {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken!);
      await supabase.from("measurements").delete().eq("id", id);

      setMeasurements(
        measurements!.filter(
          (measurement: Measurements) => measurement.id != id
        )
      );

      toast.success("Task deleted.");
      // fetchPosts()
    } catch (e) {
      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
      // addTaskModal.onClose();
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Apri il menù</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => modifyConsumption(measurementsRow.id)}>
          Modify
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteTask(measurementsRow.id)}>
          Delete
          {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
