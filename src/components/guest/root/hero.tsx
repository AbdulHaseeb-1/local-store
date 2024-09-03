"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero(props: any) {
  return (
    <motion.div className="relative bg-gradient-to-tr  w-full min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 bg-background text-foreground overflow-hidden">
       <div className="max-w-3xl text-center space-y-6 mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className=" bg-clip-text text-transparent bg-gradient-to-bl from-green-400 to-emerald-500 drop-shadow-lg ">
            Transform
          </span>
          <span className="">Your Life with a</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-bl from-green-400 to-emerald-500">
            {" "}
            Fresh Look
          </span>{" "}
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
          className="flex flex-col sm:flex-row justify-center gap-4  "
        >
          <Button
            size="lg"
            className="z-50 text-lg  sm:w-auto bg-gradient-to-bl from-green-400 to-emerald-500 shadow-2xl  shadow-primary  "
          >
            View Products
          </Button>
          <Button
            size="lg"
            variant={"outline"}
            className="text-lg  sm:w-auto border-[#34BE82] hover:bg-[34BE82] hover:shadow-2xl hover:shadow-primary transition-shadow duration-200  "
          >
            Explore Categories
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
