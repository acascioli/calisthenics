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
import training from "@/data/training.json" assert { type: "json" };
import ModalVideo from "../modals/modal-video";

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
