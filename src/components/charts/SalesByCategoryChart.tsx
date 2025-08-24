"use client";

import dynamic from "next/dynamic";
import { useChartContext } from "./ChartContext";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  categories: string[];
  sales: number[];
}

export function SalesByCategoryChart({ categories, sales }: Props) {
  const { selectedCategory, setSelectedCategory } = useChartContext();

  const options: ApexOptions = {
    chart: {
      id: "sales-by-category",
      type: "bar",
      toolbar: { show: false },
      events: {
        dataPointSelection: (_, __, config) => {
          const category = categories[config.dataPointIndex];
          if (selectedCategory === category) {
            // clicked same bar → toggle off
            setSelectedCategory(null);
            // ✅ SAFELY clear selection if ApexCharts is available
            if (typeof window !== "undefined" && window.ApexCharts) {
              window.ApexCharts.exec(
                "sales-by-category",
                "clearSelected"
              );
            }
          } else {
            setSelectedCategory(category);
          }
        },
      },
    },
    plotOptions: { bar: { borderRadius: 6, horizontal: true } },
    xaxis: { categories },
    dataLabels: { enabled: false },
    title: { text: "Sales by Category", align: "left" },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "Sales", data: sales }]}
      type="bar"
      height={320}
    />
  );
}
