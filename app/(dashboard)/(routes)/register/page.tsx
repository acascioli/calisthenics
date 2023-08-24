import { Heading } from "@/components/heading";
import MeasurementsTable from "@/components/register/measurements-table";
import { BookPlus, ClipboardList } from "lucide-react";

export default function RegisterPage() {
  return (
    <div>
      <Heading
        title="Register"
        description="Register your measurements."
        icon={BookPlus}
        iconColor="text-red-700"
        bgColor="bg-red-700/10"
      />
      <div className="px-4 lg:px-8">
        <MeasurementsTable />
      </div>
    </div>
  );
}
