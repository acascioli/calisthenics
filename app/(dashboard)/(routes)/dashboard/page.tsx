import KPIs from "@/components/charts/KPIs";
import { TrainingTracker } from "@/components/charts/training-tracker";

export default function HomePage() {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Keep track of your condition
        </p>
      </div>
      <div className="px-4 md:px-8 prefers-color-scheme-tremor space-y-6">
        <TrainingTracker />
        <KPIs />
      </div>
    </div>
  );
}
