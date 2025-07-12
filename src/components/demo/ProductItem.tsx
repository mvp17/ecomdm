"use client";

import { useState } from "react";

interface Props {
  id: number;
  name: string;
  price: number;
  skuCode: string;
  onOrder: (id: number, sku: string, price: number, quantity: number) => void;
}

export default function ProductItem({
  id,
  name,
  price,
  skuCode,
  onOrder,
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex flex-col">
        <div className="font-bold">{name}</div>
        <div className="text-sm text-gray-600">${price.toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
        <button
          onClick={() => onOrder(id, skuCode, price, quantity)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
