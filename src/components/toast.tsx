"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number; // Duration in milliseconds
  onClose: () => void; // Function to close the toast
};

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
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
      <motion.div
        initial={{ x: -144, y: -50, opacity: 0,borderRadius:5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
        className={` fixed top-4 left-1/2 transform -translate-x-1/2 p-3 min-w-72  shadow-md ${toastTypeClass[type]} z-50`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button className="ml-4" onClick={() => setVisible(false)}>
            ✖
          </button>
        </div>
      </motion.div>
    )
  );
};

export default Toast;
