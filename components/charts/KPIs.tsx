"use client";

import {
  Card,
  Metric,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  DeltaType,
  Grid,
} from "@tremor/react";

const data = [
  {
    Month: "Jan 21",
    Weight: 2890,
    Biceps: 2400,
    Chest: 4938,
  },
  {
    Month: "Feb 21",
    Weight: 1890,
    Biceps: 1398,
    Chest: 2938,
  },
  // ...
  {
    Month: "Jul 21",
    Weight: 3490,
    Biceps: 4300,
    Chest: 2345,
  },
];

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
}[] = [
  {
    title: "Weight",
    metric: "kg 80",
    metricPrev: "kg 85",
    delta: "34.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Biceps",
    metric: "cm 50",
    metricPrev: "cm 45",
    delta: "18.1%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Chest",
    metric: "cm 100",
    metricPrev: "cm 90",
    delta: "12.3%",
    deltaType: "moderateDecrease",
  },
];

export default function KPIs() {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <Text>{item.title}</Text>
            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{item.metric}</Metric>
            <Text>from {item.metricPrev}</Text>
          </Flex>
          <AreaChart
            className="mt-6 h-28"
            data={data}
            index="Month"
            valueFormatter={(number: number) =>
              `cm ${Intl.NumberFormat("us").format(number).toString()}`
            }
            categories={[item.title]}
            colors={["blue"]}
            showXAxis={true}
            showGridLines={false}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>
      ))}
    </Grid>
  );
}
