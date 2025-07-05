"use client";

import { useEffect } from "react";
import { Toast } from "./Toast";
import { useToastStore } from "./toastStore";

export const ToastManager = () => {
  const { toasts, removeToast } = useToastStore((state) => state);

  useEffect(() => {
    if (toasts.length > 0) {
      // Remove toast after 5 seconds
      const timer = setTimeout(() => {
        removeToast(0);
      }, 5000); // Adjust the time as needed

      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(index)}
        />
      ))}
    </div>
  );
};
