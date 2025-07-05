import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: "success" | "error" | "info") => void;
  removeToast: (index: number) => void;
}

export const useToastStore = create<ToastState>()(
  immer(
    devtools((set) => ({
      toasts: [],
      addToast: (message: string, type: "success" | "error" | "info") =>
        set((state) => ({ toasts: [...state.toasts, { message, type }] })),
      removeToast: (index: number) =>
        set((state) => ({
          toasts: state.toasts.filter((_, i) => i !== index),
        })),
    }))
  )
);
