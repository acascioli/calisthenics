import { Heading } from "@/components/heading";
import { TrainingMonth } from "@/components/tables/training-month";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { ClipboardList } from "lucide-react";

export default function TrainingPage() {
  return (
    <div>
      <Heading
        title="Training"
        description="Check your training schedule."
        icon={ClipboardList}
        iconColor="text-sky-700"
        bgColor="bg-sky-700/10"
      />
      <div className="px-4 md:px-8 prefers-color-scheme-tremor space-y-6">
        <TabGroup>
          <TabList className="mt-8">
            <Tab>Month 1</Tab>
            <Tab>Month 2</Tab>
            <Tab>Month 3</Tab>
            <Tab>Month 4</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TrainingMonth month={1} />
            </TabPanel>
            <TabPanel>
              <TrainingMonth month={2} />
            </TabPanel>
            <TabPanel>
              <TrainingMonth month={3} />
            </TabPanel>
            <TabPanel>
              <TrainingMonth month={4} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
