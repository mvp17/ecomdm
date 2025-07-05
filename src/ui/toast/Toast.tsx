import { X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
  type: "success" | "error" | "info";
}

export const Toast = ({ message, onClose, type }: ToastProps) => {
  let bgColor = "bg-gray-600"; // Default

  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    case "info":
      bgColor = "bg-blue-500";
      break;
  }

  return (
    <div
      className={`${bgColor} text-white p-4 rounded-lg shadow-md flex items-center justify-between w-full max-w-xs`}
    >
      <p className="text-sm">{message}</p>
      <button onClick={onClose} className="ml-3">
        <X size={20} />
      </button>
    </div>
  );
};
