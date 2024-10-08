"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Measurements } from "@/schemas/measurements-schema";

export const columns: ColumnDef<Measurements>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "measure_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Measure date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(new Date(row.getValue("measure_date")), "yyyy-MM-dd")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight [kg]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("weight")}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "neck",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Neck [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("neck") !== 0 ? row.getValue("neck") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "chest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chest [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("chest") !== 0 ? row.getValue("chest") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "biceps",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Biceps [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("biceps") !== 0 ? row.getValue("biceps") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "abdomen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abdomen [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("abdomen") !== 0 ? row.getValue("abdomen") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "waist",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waist [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("waist") !== 0 ? row.getValue("waist") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "hip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hip [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("hip") !== 0 ? row.getValue("hip") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "buttocks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buttocks [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("buttocks") !== 0 ? row.getValue("buttocks") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "thigh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thigh [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center">
          {row.getValue("thigh") !== 0 ? row.getValue("thigh") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "calf",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Calf [cm]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center ">
          {row.getValue("calf") !== 0 ? row.getValue("calf") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "bf_index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Body fat [%]" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[80px] items-center justify-center">
          {row.getValue("bf_index") !== 0 ? row.getValue("bf_index") : ""}
        </div>
      );
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
