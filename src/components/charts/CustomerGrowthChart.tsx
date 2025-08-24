"use client";

import { Chart } from "./Chart";
import type { ApexOptions } from "apexcharts";

interface Props {
  months: string[];
  newCustomers: number[];
  returningCustomers: number[];
}

export function CustomerGrowthChart({
  months,
  newCustomers,
  returningCustomers,
}: Props) {
  const options: ApexOptions = {
    chart: { type: "area", toolbar: { show: false } },
    stroke: { curve: "smooth" },
    dataLabels: { enabled: false },
    xaxis: { categories: months },
    yaxis: { labels: { formatter: (val) => val.toString() } },
    tooltip: { y: { formatter: (val) => `${val} customers` } },
    title: { text: "Customer Growth", align: "left" },
    colors: ["#008FFB", "#00E396"], // Blue for new, green for returning
  };

  return (
    <Chart
      type="area"
      options={options}
      series={[
        { name: "New Customers", data: newCustomers },
        { name: "Returning Customers", data: returningCustomers },
      ]}
    />
  );
}
