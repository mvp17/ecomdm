"use client";

import { useEffect, useState } from "react";
import ProductItem from "@/components/demo/ProductItem";
import OrderMessage from "@/components/demo/OrderMessage";
import CreateProductModal from "@/components/demo/CreateProductModal";
import { Product } from "@/components/demo/types/product";
import { apiClient } from "@/lib/axiosInstance";
import keycloak from "@/lib/keycloak";

export default function DemoPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await apiClient.get("/product");
    setProducts(res.data);
  };

  const [messages, setMessages] = useState<
    Record<number, { message: string; type: "success" | "error" }>
  >({});

  const [modalOpen, setModalOpen] = useState(false);

  const handleOrder = async (
    id: number,
    sku: string,
    price: number,
    quantity: number
  ) => {
    if (!quantity || quantity <= 0) {
      setMessages((prev) => ({
        ...prev,
        [id]: { message: "Quantity must be greater than 0.", type: "error" },
      }));
    } else {
      try {
        const userDetails = {
          email: keycloak.idTokenParsed?.email,
          firstName: keycloak.idTokenParsed?.given_name,
          lastName: keycloak.idTokenParsed?.family_name,
        };

        const res = await apiClient.post(`/order`, {
          skuCode: sku,
          price: price,
          quantity: quantity,
          userDetails: userDetails,
        });

        console.log("Order response:", res.data);

        setMessages((prev) => ({
          ...prev,
          [id]: {
            message: `Ordered ${quantity} item(s) successfully!`,
            type: "success",
          },
        }));
      } catch (err) {
        console.error("Failed to load image:", err);
      }
    }
  };

  const handleCreateProduct = async (productData: {
    skuCode: string;
    name: string;
    description: string;
    price: number;
  }) => {
    try {
      await apiClient.post(`/product`, {
        skuCode: productData.skuCode,
        name: productData.name,
        description: productData.description,
        price: productData.price,
      });
      const res = await apiClient.get("/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to create product:", err);
      return;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Products ({products.length})
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductItem {...product} onOrder={handleOrder} />
            {messages[product.id] && (
              <OrderMessage
                message={messages[product.id].message}
                type={messages[product.id].type}
              />
            )}
          </div>
        ))}
      </div>

      <CreateProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}
