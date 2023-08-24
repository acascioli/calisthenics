"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import training from "@/data/training.json" assert { type: "json" };
import ModalVideo from "../modals/modal-video";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TrainingTable({
  week,
  month,
  day,
}: {
  week: number;
  month: number;
  day: number;
}) {
  const data = training.filter(
    (tr) => tr.Month === month && tr.Week === week && tr.Day === day
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-[350px]">Exercise</TableHead>
          <TableHead className="text-center">Execution</TableHead>
          <TableHead className="text-center">Video</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.Exercise}>
            <TableCell className="font-medium">{d.Exercise}</TableCell>
            <TableCell className="text-center">{d.Execution}</TableCell>
            <TableCell className="text-center">
              {" "}
              <ModalVideo video={d.Link!} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
