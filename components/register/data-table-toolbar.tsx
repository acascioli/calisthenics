"use client";

import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import useMeasureModal from "@/app/hooks/use-measure-modal";
import { LucideShieldQuestion } from "lucide-react";
import useInfoModal from "@/app/hooks/use-info-modal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const measureModal = useMeasureModal();
  const infoModal = useInfoModal();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter measures..."
          value={
            (table.getColumn("measure_date")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("measure_date")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex mt-4 lg:mt-0">
        <Button
          // variant="premium"
          onClick={infoModal.onOpen}
          size="sm"
          className="h-8 border-dashed mr-2"
        >
          <LucideShieldQuestion className="mr-2 h-4 w-4" />
          Info
        </Button>
        <Button
          variant="premium"
          onClick={measureModal.onOpen}
          size="sm"
          className="h-8 border-dashed mr-2"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
