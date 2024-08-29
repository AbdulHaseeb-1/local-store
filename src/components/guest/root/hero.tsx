"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Hero(props : any) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="w-full min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-3xl text-center space-y-6 mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Transform Your Life with a Fresh Look
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-xl text-muted-foreground sm:text-2xl"
        >
          Explore everything and find the best to refresh your life and elevate
          your everyday experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button size="lg" className="text-lg w-full sm:w-auto">
            View Products
          </Button>
          <Button
            size="lg"
            variant={"secondary"}
            className="text-lg w-full sm:w-auto"

          >
            Explore Categories
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
