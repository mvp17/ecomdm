import { SalesData, RevenueData, ProductData } from "./types";

export function mapSalesToChart(data: SalesData[]) {
  return {
    categories: data.map((d) => d.category),
    sales: data.map((d) => d.sales),
  };
}

export function mapRevenueToChart(data: RevenueData[]) {
  return {
    months: data.map((d) => d.month),
    revenue: data.map((d) => d.revenue),
  };
}

export function mapProductsToChart(data: ProductData[]) {
  return {
    productNames: data.map((d) => d.name),
    unitsSold: data.map((d) => d.unitsSold),
  };
}
