import { Heart, X, Trash } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useWishListStore } from "./WishListStore";

export const WishList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleWishList = () => setIsOpen(!isOpen);
  const { wishListItems, removeItem, resetWishList } = useWishListStore();

  return (
    <div>
      <button
        className="relative p-2 rounded-full hover:bg-stone-200 cursor-pointer"
        onClick={toggleWishList}
      >
        <Heart size={24} />
        {wishListItems.length !== 0 ? (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {wishListItems.length}
          </span>
        ) : null}
      </button>
      <div className="relative h-full flex flex-col">
        {isOpen && (
          <>
            {/* Background Overlay (Click to Close) */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={toggleWishList}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="fixed top-0 right-0 w-80 max-h-screen h-full bg-white shadow-lg p-4 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-lg font-bold">Wish List</h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                  onClick={toggleWishList}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-4 overflow-y-auto max-h-[70vh] space-y-4 flex-1">
                {wishListItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start p-4 border rounded-lg shadow-sm bg-white"
                  >
                    {/* Wishlist Item Details */}
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 italic mt-1">
                        Added on: {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                      {item.notes && (
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-medium">Notes:</span>{" "}
                          {item.notes}
                        </p>
                      )}
                      <p
                        className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded ${
                          item.priority === "high"
                            ? "bg-red-500 text-white"
                            : item.priority === "medium"
                            ? "bg-yellow-400 text-black"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {item.priority.charAt(0).toUpperCase() +
                          item.priority.slice(1)}{" "}
                        Priority
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-white border-t pt-3 p-4">
                <button
                  className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                  onClick={resetWishList}
                >
                  Reset Wish List
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
