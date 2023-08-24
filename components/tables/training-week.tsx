import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { TrainingTable } from "./training-table";

export const TrainingWeek = ({
  week,
  month,
}: {
  week: number;
  month: number;
}) => {
  return (
    <TabGroup>
      <TabList className="mt-8">
        <Tab>Day 1</Tab>
        <Tab>Day 2</Tab>
        <Tab>Day 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TrainingTable month={month} week={week} day={1} />
        </TabPanel>
        <TabPanel>
          <TrainingTable month={month} week={week} day={2} />{" "}
        </TabPanel>
        <TabPanel>
          <TrainingTable month={month} week={week} day={3} />{" "}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
