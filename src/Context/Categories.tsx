"use client";
import axios from "@/lib/axios";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface CategoryContextType {
  categories: Category[] | null;
  setCategories: Dispatch<SetStateAction<Category[] | null>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  newCategory: any;
  setNewCategory: Dispatch<SetStateAction<any>>;
  error: string;
  setError: Dispatch<SetStateAction<any>>;
}

interface Category {
  id: number | null;
  name: string;
  description: string;
  image: any;
}

const initialStates: Category = {
  id: null,
  name: "",
  description: "",
  image: null,
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] =
    useState<Partial<Category>>(initialStates);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string>("");
  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        showModal,
        setShowModal,
        newCategory,
        setNewCategory,
        error,
        setError,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => useContext(CategoryContext);
