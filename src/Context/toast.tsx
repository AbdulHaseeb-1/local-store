"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "@/components/toast";

// Define the types for the toast
type ToastType = "success" | "error" | "info" | "warning";

type ToastContextType = {
  showToast: (message: string, type: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook to use the Toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Define a ToastProvider that wraps the application and provides the context
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: ToastType; duration: number }[]
  >([]);

  // Function to show a toast
  const showToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Date.now(); // Unique ID for each toast
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  // Function to remove a toast
  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
