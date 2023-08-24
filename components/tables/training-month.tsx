import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { TrainingWeek } from "./training-week";

export const TrainingMonth = ({ month }: { month: number }) => {
  return (
    <TabGroup>
      <TabList className="mt-8">
        <Tab>Week 1</Tab>
        <Tab>Week 2</Tab>
        <Tab>Week 3</Tab>
        <Tab>Week 4</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TrainingWeek month={month} week={1} />
        </TabPanel>
        <TabPanel>
          <TrainingWeek month={month} week={2} />
        </TabPanel>
        <TabPanel>
          <TrainingWeek month={month} week={3} />
        </TabPanel>
        <TabPanel>
          <TrainingWeek month={month} week={4} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
