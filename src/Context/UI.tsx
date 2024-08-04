"use client";

import { UIContextType } from "@/types/ui";
import { createContext, ReactNode, useContext, useState } from "react";

const UIContext = createContext<UIContextType | null>(null);

export default function UIProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UIContext.Provider
      value={{ showModal, setShowModal, isLoading, setIsLoading }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
