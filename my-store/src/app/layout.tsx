import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider"
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/Context/Cart";
import { Toaster } from "@/components/ui/toaster"
import { CategoryProvider } from "@/Context/Categories";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} scroll-smooth `}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <CategoryProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </CategoryProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html >
  );
}
