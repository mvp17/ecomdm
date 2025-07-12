"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Product } from "./types/product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (product: {
    skuCode: string;
    name: string;
    description: string;
    price: number;
  }) => void;
}

export default function CreateProductModal({
  isOpen,
  onClose,
  onCreate,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>();

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const submitHandler = (data: Product) => {
    onCreate({
      skuCode: data.skuCode,
      name: data.name,
      description: data.description,
      price: data.price,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Product</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">SKU Code</label>
            <input
              {...register("skuCode", {
                required: "SKU is required",
                pattern: {
                  value: /^[a-zA-Z0-9\-]+$/,
                  message: "Only alphanumeric or hyphens allowed",
                },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.skuCode && (
              <p className="text-red-500 text-sm">
                {errors.skuCode.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "At least 10 characters" },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              min={0}
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Must be greater than 0" },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
