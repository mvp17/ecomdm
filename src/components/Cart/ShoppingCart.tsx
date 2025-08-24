import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "./CartStore";
import { loadStripe } from "@stripe/stripe-js";
import { postCheckout } from "@/api/checkout-service";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, increaseQuantity, decreaseQuantity, resetCart } =
    useCartStore();

  const toggleCart = () => setIsOpen(!isOpen);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkOut = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const response = await postCheckout(cartItems);
      const data = response.data;

      if (!response.data) {
        throw new Error("Checkout failed.");
      }

      const stripe = await stripePromise;

      if (stripe && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to redirect to checkout.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div>
      <button
        className="relative p-2 rounded-full hover:bg-stone-200 cursor-pointer"
        onClick={toggleCart}
      >
        <ShoppingCart size={24} />
        {cartItems.length !== 0 ? (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cartItems.length}
          </span>
        ) : null}
      </button>
      <div className="relative h-full flex flex-col">
        {isOpen && (
          <>
            {/* Background Overlay (Click to Close) */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={toggleCart}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                  onClick={toggleCart}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-4 overflow-y-auto max-h-[70vh] space-y-4 flex-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-white border-t pt-3 p-4">
                <p className="text-lg font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <button
                  className="w-full mt-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                  onClick={checkOut}
                >
                  Checkout
                </button>
                <button
                  className="w-full mt-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                  onClick={resetCart}
                >
                  Reset Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
