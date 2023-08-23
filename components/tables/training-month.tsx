import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { TrainingTable } from "./training-table";

export const TrainingMonth = ({ month }: { month: string }) => {
  return (
    <TabGroup>
      <TabList className="mt-8">
        <Tab>Day 1</Tab>
        <Tab>Day 2</Tab>
        <Tab>Day 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TrainingTable />
        </TabPanel>
        <TabPanel>
          <TrainingTable />{" "}
        </TabPanel>
        <TabPanel>
          <TrainingTable />{" "}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
