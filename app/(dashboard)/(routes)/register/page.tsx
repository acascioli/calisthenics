import { Heading } from "@/components/heading";
import MeasurementsTable from "@/components/register/measurements-table";
import { ClipboardList } from "lucide-react";

export default function RegisterPage() {
  return (
    <div>
      <Heading
        title="Register"
        description="Register your measurements."
        icon={ClipboardList}
        iconColor="text-sky-700"
        bgColor="bg-sky-700/10"
      />
      <div className="px-4 lg:px-8">
        <MeasurementsTable />
      </div>
    </div>
  );
}
