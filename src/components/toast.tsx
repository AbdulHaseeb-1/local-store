"use client"
import React, { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number; // Duration in milliseconds
  onClose: () => void; // Function to close the toast
};

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto hide the toast after a certain duration
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // CSS classes for different toast types
  const toastTypeClass = {
    success: "bg-green-700 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-600 text-black",
  };

  return (
    visible && (
      <div
        className={`fixed rounded-t-sm top-4 left-1/2 transform -translate-x-1/2 p-3 min-w-72 rounded shadow-md ${toastTypeClass[type]} z-50`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button className="ml-4" onClick={() => setVisible(false)}>
            ✖
          </button>
        </div>
      </div>
    )
  );
};

export default Toast;
