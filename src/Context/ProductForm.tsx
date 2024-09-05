"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ProductFormContextType {
  formData: Record<string, any>;
  setFormData: Dispatch<SetStateAction<any>>;
  attributes: Record<string, string>[];
  setAttributes: Dispatch<SetStateAction<any>>;
  initialStates: Record<string, any>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const initialStates = {
  title: "",
  subTitle: "",
  description: "",
  category: "",
  brand: "",
  purchase_price: "",
  selling_price: "",
  stock: "",
  isFeatured: false,
  image1: null,
  image2: null,
  image3: null,
  image4: null,
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(
  undefined
);

export default function ProductFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  // *------------------- States ----------------------
  const [formData, setFormData] = useState(initialStates);
  const [attributes, setAttributes] = useState<Record<string, string>[]>([]);
  const [error, setError]: any = useState({ path: "", message: "" });

  return (
    <ProductFormContext.Provider
      value={{
        error,
        setError,
        formData,
        setFormData,
        attributes,
        setAttributes,
        initialStates,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
}

export const useProductForm = () => useContext(ProductFormContext);
