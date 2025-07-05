import { Card, CardHeader, CardTitle, CardContent } from "@/ui/Card";
import { Button } from "@/app/products/components/Button";
import { Heart, ShoppingCart, Eye /*Share2, Scale*/ } from "lucide-react";
import { Product } from "../Product";
import { useCartStore } from "@/components/Cart/CartStore";
import { useState } from "react";
import { Modal } from "@/ui/Modal";
import { useWishListStore } from "@/components/wishList/WishListStore";
import { apiClient } from "@/utils/axiosInstance";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItemToCart = useCartStore((state) => state.addItem);
  const addItemToWishList = useWishListStore((state) => state.addItem);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isWishListModalOpen, setIsWishListModalOpen] = useState(false);
  const [wishlistNotes, setWishlistNotes] = useState("");
  const [wishlistPriority, setWishlistPriority] = useState("low");

  const handleViewDetails = () => {
    setIsDetailModalOpen(true);
  };

  const handleWishList = () => {
    setIsWishListModalOpen(true);
  };

  const handleWishListFormSubmit = () => {
    const wishlistItem = {
      ...product,
      notes: wishlistNotes,
      priority: wishlistPriority,
      addedAt: new Date().toISOString(),
    };
    addItemToWishList(wishlistItem);
    closeWishListModal();
  };

  const closeWishListModal = () => {
    setIsWishListModalOpen(false);
    resetWishListForm();
  };

  const resetWishListForm = () => {
    setWishlistNotes("");
    setWishlistPriority("low");
  };

  const handleReportClick = async (product: Product) => {
    try {
      const response = await apiClient.post("/report", product);
      const base64String = response.data.pdfBase64; // Extract Base64 string

      // Convert Base64 to a Blob
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

      // Create a Blob URL and open in a new tab
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      setIsDetailModalOpen(false);
      console.error("Error generating report:", error);
    }
  };

  return (
    <Card className="p-4 rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-gray-700 mb-3 font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="default"
            className="flex items-center gap-1"
            onClick={() => addItemToCart(product)}
          >
            <ShoppingCart size={16} /> Add to Cart
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleViewDetails}
          >
            <Eye size={16} /> View Details
          </Button>

          {isDetailModalOpen && (
            <Modal
              onClose={() => setIsDetailModalOpen(false)}
              title="Product Details"
            >
              <div className="p-4 pb-16 relative">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">
                  ${product.price.toFixed(2)}
                </p>

                {/* Buttons Container - Stays at Bottom Without Overlapping Content */}
                <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between">
                  <button
                    onClick={() => handleReportClick(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                  >
                    Report
                  </button>

                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          )}

          <Button
            variant="ghost"
            className="text-red-500 flex items-center gap-1"
            onClick={handleWishList}
          >
            <Heart size={16} /> Wishlist
          </Button>

          {isWishListModalOpen && (
            <Modal onClose={() => closeWishListModal()} title="Wish List">
              <div className="p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleWishListFormSubmit();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add notes about this item..."
                      value={wishlistNotes}
                      onChange={(e) => setWishlistNotes(e.target.value)}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <select
                      value={wishlistPriority}
                      onChange={(e) => setWishlistPriority(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Add to Wishlist
                  </button>
                </form>

                <button
                  onClick={() => closeWishListModal()}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </Modal>
          )}
          {/*
          <Button
            variant="ghost"
            className="text-blue-500 flex items-center gap-1"
          >
            <Share2 size={16} /> Share
          </Button>
          <Button
            variant="ghost"
            className="text-gray-500 flex items-center gap-1"
          >
            <Scale size={16} /> Compare
          </Button>
*/}
        </div>
      </CardContent>
    </Card>
  );
};
