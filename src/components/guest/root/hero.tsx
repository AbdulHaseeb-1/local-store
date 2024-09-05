"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "@/../public/css/root.css";

export default function Hero(props: any) {
  return (
      <motion.div className="bg-image bottom-inside-shadow bg-neutral-700 bg-blend-darken relative  py-28 px-2 min-h-full grid place-items-center transition-colors duration-200  text-foreground overflow-hidden">
        <div className="max-w-3xl text-center space-y-6 mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="drop_shadow bg-clip-text text-transparent bg-gradient-to-bl from-green-400 to-emerald-500 drop-shadow-lg ">
              Transform
            </span>
            <span className="">Your Life with a</span>
            <span className=" drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-bl from-green-400 to-emerald-500">
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
            Explore everything and find the best to refresh your life and
            elevate your everyday experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col px-10 md:mx-0 sm:flex-row justify-center gap-4  "
          >
            <Button
              size="lg"
              className=" text-lg  sm:w-auto bg-primary-gradient shadow-2xl  shadow-[#4ade80]   "
            >
              View Products
            </Button>
            <Button
              size="lg"
              variant={"outline"}
              className="text-lg sm:w-auto  bg-green-400/15 hover:bg-green-400/20   border border-green-400  "
            >
              Explore Categories
            </Button>
          </motion.div>
        </div>
      </motion.div>
  );
}
