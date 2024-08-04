"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AttributeContextType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const AttributeContext = createContext<AttributeContextType | null>(null);

export default function AttributeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <AttributeContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </AttributeContext.Provider>
  );
}

export const useAttributes = () => useContext(AttributeContext);
