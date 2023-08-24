"use client";

import useLoading from "@/app/hooks/use-loading";
import useMeasurements from "@/app/hooks/use-measurements";
import { supabaseClient } from "@/lib/superbase-client";
import { Measurements } from "@/schemas/measurements-schema";
import { useAuth } from "@clerk/nextjs";
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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import PageLoader from "../page-loader";

interface Category {
  id: string;
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
  data: { month: string; value: number }[];
}

export default function KPIs() {
  const { measurements, setMeasurements } = useMeasurements();
  const { getToken } = useAuth();
  const { loading, setLoading } = useLoading();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    setLoading(true);

    const processData = (
      data: Measurements[],
      measure: keyof typeof measurements
    ) => {
      const data_filtered = data.filter((d) => d[measure] !== 0);
      const a = data_filtered.map((item: Measurements) =>
        format(new Date(item.measure_date!), "MMM yy")
      );
      const b = data_filtered.map((item: Measurements) => item[measure]);

      const sumByMonthMap = a.reduce((acc: any, month: any, index: number) => {
        if (!acc[month]) {
          acc[month] = b[index];
        } else {
          acc[month] += b[index];
        }
        return acc;
      }, {});

      const result = Object.keys(sumByMonthMap).map((month) => {
        return {
          month,
          value: sumByMonthMap[month],
        };
      });
      return result;
    };

    const get_category = (
      id: string,
      title: string,
      unit: string,
      data: { month: string; value: number }[]
    ) => {
      if (data != null || data != undefined) {
        if (data.length === 0) {
          const cat: Category = {
            id: id,
            title: title,
            metric: `${unit} 0`,
            metricPrev: `${unit} 0`,
            delta: "0 %",
            deltaType: "unchanged",
            data: [
              { month: "Gen 21", value: 0 },
              { month: "Ago 21", value: 0 },
            ],
          };
          return cat;
        }
        if (data.length > 1) {
          const cat: Category = {
            id: id,
            title: title,
            metric: `${unit} ${Intl.NumberFormat("it-IT").format(
              data.at(-1)!.value
            )}`,
            metricPrev: `${unit} ${Intl.NumberFormat("it-IT").format(
              data.at(-2)!.value
            )}`,
            delta: `${Math.abs(
              ((data.at(-1)!.value - data.at(-2)!.value) / data.at(-2)!.value) *
                100
            ).toFixed(1)} %`,
            deltaType:
              data.at(-1)!.value < data.at(-2)!.value
                ? "moderateDecrease"
                : "moderateIncrease",
            data: data,
          };
          return cat;
        }
        if (data.length > 0) {
          const cat: Category = {
            id: id,
            title: title,
            metric: `${unit} ${Intl.NumberFormat("it-IT").format(
              data.at(-1)!.value
            )}`,
            metricPrev: `${unit} 0`,
            delta: "0 %",
            deltaType: "unchanged",
            data: [
              {
                month: format(new Date(data.at(-1)!.month), "MMM yy"),
                value: data.at(-1)!.value,
              },
            ],
          };
          return cat;
        }
      }
      const cat: Category = {
        id: id,
        title: title,
        metric: `${unit} 0`,
        metricPrev: `${unit} 0`,
        delta: "0 %",
        deltaType: "unchanged",
        data: [
          { month: "Gen 21", value: 0 },
          { month: "Ago 21", value: 0 },
        ],
      };
      return cat;
    };

    const loadTasks = async () => {
      if (measurements == null || measurements == undefined) {
        const supabaseAccessToken = await getToken({
          template: "supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken!);
        const { data } = await supabase
          .from("measurements")
          .select("*")
          .order("measure_date", { ascending: true });
        setMeasurements(data!);
      }
    };
    try {
      loadTasks();
      const weight = processData(
        measurements!,
        "weight" as keyof typeof measurements
      );
      const biceps = processData(
        measurements!,
        "biceps" as keyof typeof measurements
      );
      const chest = processData(
        measurements!,
        "chest" as keyof typeof measurements
      );
      const waist = processData(
        measurements!,
        "waist" as keyof typeof measurements
      );
      const buttocks = processData(
        measurements!,
        "buttocks" as keyof typeof measurements
      );
      const calf = processData(
        measurements!,
        "calf" as keyof typeof measurements
      );
      const thigh = processData(
        measurements!,
        "thigh" as keyof typeof measurements
      );
      const cats: Category[] = [
        get_category("weight", "Weight", "kg", weight),
        get_category("biceps", "Biceps", "cm", biceps),
        get_category("chest", "Biceps", "cm", chest),
        get_category("waist", "Biceps", "cm", waist),
        get_category("buttocks", "Biceps", "cm", buttocks),
        get_category("calf", "Biceps", "cm", calf),
        get_category("thigh", "Biceps", "cm", thigh),
      ];
      setCategories([...cats]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [getToken, measurements, setMeasurements, loading, setLoading]);

  return (
    <div>
      {categories ? (
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {categories!.map((item) => (
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
                data={item.data}
                index="month"
                valueFormatter={(number: number) =>
                  item.id != "weight"
                    ? `cm ${Intl.NumberFormat("it-IT")
                        .format(number)
                        .toString()}`
                    : `kg ${Intl.NumberFormat("it-IT")
                        .format(number)
                        .toString()}`
                }
                categories={["value"]}
                // categories={[item.title]}
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
      ) : (
        <PageLoader />
        // <div>No entries yet...</div>
      )}
    </div>
  );
}
