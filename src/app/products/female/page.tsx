"use client";

import { ProductCard } from "@/components/ProductCard";
import React, { useEffect } from "react";
import { useProductsStore } from "@/stores/ProductStore";
import withAuthGuard from "@/utils/withAuthGuard";

const ProductsPage = () => {
  const allProducts = useProductsStore((state) => state.femaleProducts);
  const getAllProducts = useProductsStore((state) => state.getAll);

  useEffect(() => {
    if (allProducts.length === 0) getAllProducts();
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Products Female</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default withAuthGuard(ProductsPage);
