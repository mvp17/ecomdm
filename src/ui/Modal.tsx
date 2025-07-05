import { X } from "lucide-react";
import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

export const Modal = ({ children, onClose, title }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-brightness-75">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative border"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Title section */}
        {title && (
          <div className="text-xl font-semibold mb-4">
            <h2>{title}</h2>
          </div>
        )}

        {children}
      </motion.div>
    </div>
  );
};
