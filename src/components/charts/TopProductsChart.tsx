"use client";

import { Chart } from "./Chart";
import { useChartContext } from "./ChartContext";
import type { ApexOptions } from "apexcharts";

interface Product {
  name: string;
  unitsSold: number;
  category: string;
}

interface Props {
  products: Product[];
}

export function TopProductsChart({ products }: Props) {
  const { selectedCategory } = useChartContext();

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const options: ApexOptions = {
    labels: filtered.map((p) => p.name),
    legend: { position: "bottom" },
    title: {
      text: selectedCategory
        ? `Top Products in ${selectedCategory}`
        : "Top Selling Products",
      align: "left",
    },
    tooltip: { y: { formatter: (val) => `${val} units` } },
  };

  return (
    <Chart
      type="donut"
      options={options}
      series={filtered.map((p) => p.unitsSold)}
    />
  );
}
