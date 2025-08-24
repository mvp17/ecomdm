"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radar"
  | "heatmap";

export interface ChartProps {
  type: ChartType;
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  width?: string | number;
  height?: string | number;
}

export function Chart({
  type,
  options,
  series,
  width = "100%",
  height = 320,
}: ChartProps) {
  const memoizedOptions = useMemo(() => options, [options]);

  return (
    <ReactApexChart
      options={memoizedOptions}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  );
}
