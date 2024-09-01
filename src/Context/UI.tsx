"use client";

import { UIContextType } from "@/types/ui";
import { createContext, ReactNode, useContext, useState } from "react";
import { useToast } from "./toast";

const UIContext = createContext<UIContextType | null>(null);

export default function UIProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <UIContext.Provider
      value={{
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
        isSubmitAble,
        setIsSubmitAble,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
