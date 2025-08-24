"use client";

import { SalesByCategoryChart } from "@/components/charts/SalesByCategoryChart";
import { RevenueOverTimeChart } from "@/components/charts/RevenueOverTimeChart";
import { TopProductsChart } from "@/components/charts/TopProductsChart";
import { CustomerGrowthChart } from "@/components/charts/CustomerGrowthChart";
import {
  mapSalesToChart,
  mapRevenueToChart,
  //mapProductsToChart,
} from "@/components/charts/utils";
import withAuthGuard from "@/utils/withAuthGuard";
import { ChartProvider } from "@/components/charts/ChartContext";

const salesData = [
  { category: "Shirts", sales: 1200 },
  { category: "Jeans", sales: 900 },
  { category: "Shoes", sales: 1500 },
  { category: "Hats", sales: 400 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 5500 },
  { month: "Apr", revenue: 8000 },
];

const productData = [
  // Shoes
  { name: "Sneakers", unitsSold: 500, category: "Shoes" },
  { name: "Loafers", unitsSold: 300, category: "Shoes" },
  { name: "Boots", unitsSold: 220, category: "Shoes" },
  { name: "Sandals", unitsSold: 180, category: "Shoes" },

  // Shirts
  { name: "T-Shirt", unitsSold: 350, category: "Shirts" },
  { name: "Dress Shirt", unitsSold: 200, category: "Shirts" },
  { name: "Polo Shirt", unitsSold: 150, category: "Shirts" },
  { name: "Hoodie", unitsSold: 100, category: "Shirts" },

  // Jeans
  { name: "Denim Jacket", unitsSold: 200, category: "Jeans" },
  { name: "Skinny Jeans", unitsSold: 180, category: "Jeans" },
  { name: "Regular Jeans", unitsSold: 160, category: "Jeans" },

  // Hats
  { name: "Cap", unitsSold: 150, category: "Hats" },
  { name: "Beanie", unitsSold: 120, category: "Hats" },
  { name: "Fedora", unitsSold: 80, category: "Hats" },
];

const customerGrowthData = {
  months: ["Jan", "Feb", "Mar", "Apr"],
  newCustomers: [50, 120, 180, 250],
  returningCustomers: [30, 90, 130, 200],
};

const DashboardPage = () => {
  const sales = mapSalesToChart(salesData);
  const revenue = mapRevenueToChart(revenueData);
  //const products = mapProductsToChart(productData);

  return (
    <ChartProvider>
      <main className="grid gap-6 md:grid-cols-2 p-6">
        <SalesByCategoryChart {...sales} />
        <RevenueOverTimeChart {...revenue} />
        <TopProductsChart products={productData} />
        <CustomerGrowthChart {...customerGrowthData} />
      </main>
    </ChartProvider>
  );
};

export default withAuthGuard(DashboardPage);
