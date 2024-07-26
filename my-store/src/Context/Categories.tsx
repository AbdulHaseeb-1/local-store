"use client";
import axios from "@/lib/axios";
import { ReactNode, useContext, useState, createContext, Dispatch, SetStateAction, useEffect } from "react";


interface CategoryContextType {
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    newCategory: any,
    setNewCategory: Dispatch<SetStateAction<any>>;
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
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState<Partial<Category>>(initialStates);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios("/categories");
                const responseCategories = JSON.parse(response.data.json);
                setCategories(responseCategories);
            } catch (err) {
                setError("Something went wrong");
            }
        }
        getCategories();
    }, [])


    return (
        <CategoryContext.Provider value={{ categories, setCategories, showModal, setShowModal, newCategory, setNewCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategories = () => useContext(CategoryContext);

