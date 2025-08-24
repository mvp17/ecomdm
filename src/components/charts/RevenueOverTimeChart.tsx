"use client";

import { Chart } from "./Chart";
import type { ApexOptions } from "apexcharts";

interface Props {
  months: string[];
  revenue: number[];
}

export function RevenueOverTimeChart({ months, revenue }: Props) {
  const options: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: months },
    yaxis: { labels: { formatter: (v) => `$${v.toLocaleString()}` } },
    tooltip: { y: { formatter: (val) => `$${val}` } },
    title: { text: "Revenue Over Time", align: "left" },
  };

  return (
    <Chart
      type="line"
      options={options}
      series={[{ name: "Revenue", data: revenue }]}
    />
  );
}
