"use client";

import { createContext, useContext, useState } from "react";

interface ChartContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ChartContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </ChartContext.Provider>
  );
}

export function useChartContext() {
  const ctx = useContext(ChartContext);
  if (!ctx)
    throw new Error("useChartContext must be used inside ChartProvider");
  return ctx;
}
