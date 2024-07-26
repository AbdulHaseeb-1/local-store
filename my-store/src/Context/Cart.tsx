"use client";
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Crypto from "crypto-js";
import Cookies from "js-cookie";

type CartItemType = {
    id: number;
    title: string;
    image: string;
    category: string;
    quantity: number;
    price: number;
};

type CartContextType = {
    cart: [];
    addToCart: (item: any) => void;
    removeFromCart: (itemId: number) => void;
    clearCart: () => void;
    setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>; 
    flag: boolean;
};

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    setCart: () => { },
    flag: false,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // ? ================= States ===================
    const { toast } = useToast();
    const [cart, setCart] = useState(() => {
        // * Load cart from local storage if available
        if (typeof window !== 'undefined') {
            const SECRET: any = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
            const encryptedCart: any = Cookies.get('ls-cart');
            if (!encryptedCart) {
                return [];
            }
            const bytes = Crypto.AES.decrypt(encryptedCart, SECRET);
            const decryptedCart = JSON.parse(bytes.toString(Crypto.enc.Utf8));
            return decryptedCart ? decryptedCart : [];
        }
    });
    // * Change flag to render some items
    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        // Save cart to local storage whenever it changes
        const SECRET: any = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
        const stringify = JSON.stringify(cart);
        const encrypted = Crypto.AES.encrypt(stringify, SECRET).toString();
        Cookies.set('ls-cart', encrypted, { expires: 30 }); // Set cookie to expire in 30 days
    }, [cart]);


    const addToCart = (item: any) => {
        // * Filter cart to check if it already exists---
        let result = cart.filter((product: any) => product.id == item.id)
        if (!result.length) {
            // * Product doesn't exist, add it to the cart
            setCart((prevCart: any) => [...prevCart, {
                id: item.id,
                title: item.title,
                image: item.image_url,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
            }]);

            toast({
                title: "Success",
                description: "Product Added To Cart",
                className: cn(
                    'top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-700 text-white'
                ),
                variant: "default",
                duration: 3000,
            });
        } else {
            // * Product already exists, show a different message
            toast({
                title: "Info",
                description: "Product Already In Cart",
                className: cn(
                    'top-2 right-0 w-5/6 md-w-full  flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-blue-700 text-white' // Adjust color for info message
                ),
                variant: "default",
                duration: 3000,
            });
            setFlag((prevFlag) => !prevFlag);
        }
    };

    const removeFromCart = (itemId: any) => {
        setCart((prevCart: any) => prevCart.filter((item: any) => item.id !== itemId));
        const SECRET: any = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY;
        const encryptedCart: any = Cookies.get('ls-cart');
        const bytes = Crypto.AES.decrypt(encryptedCart, SECRET);
        const decryptedCart = JSON.parse(bytes.toString(Crypto.enc.Utf8));
        const updatedCart = decryptedCart.filter((item: any) => item.id !== itemId);
        const stringify = JSON.stringify(updatedCart);
        const encrypted = Crypto.AES.encrypt(stringify, SECRET).toString();
        Cookies.set('ls-cart', encrypted, { expires: 30 });
        toast({
            title: "Success",
            description: "Product Removed From Cart",
            className: cn(
                'top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-700 text-white'
            ),
            variant: "default",
            duration: 3000,
        })
        setFlag((prevFlag) => !prevFlag);
    };

    const clearCart = () => {
        setCart([]);
        setFlag((prevFlag) => !prevFlag);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, flag, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default function useCart() {
    return useContext(CartContext);
}