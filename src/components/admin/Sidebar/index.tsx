"use client";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import LocalFont from "next/font/local";
import { TbCategory2, TbLayoutDashboard } from "react-icons/tb";
import { BsBoxes } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BiChart, BiExit } from "react-icons/bi";
import { MdEditAttributes } from "react-icons/md";

const playWrite = LocalFont({
  src: "../../../fonts/PlaywriteNGModern-Regular.ttf",
  variable: "--font-play",
});

export default function SideBar(props: {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}) {
  const closeSidebar = () => props.setSidebarOpen(false);

  return (
    <>
      {props.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          style={{ opacity: props.sidebarOpen ? 1 : 0 }}
        ></div>
      )}
      <div
        className={`fixed md:relative h-full overflow-hidden dark:bg-neutral-900 bg-white ${
          props.sidebarOpen ? "w-56" : "hidden md:block md:w-12"
        }  border-r z-50 md:z-0`}
      >
        <div
          className={`h-14 flex items-center justify-around md:justify-center  w-full `}
        >
          <Link href="/" className="flex gap-1 items-center">
            <FiShoppingBag
              color="#dddddd"
              size={28}
              className="bg-neutral-600 rounded-full py-[6px]"
            />
            {props.sidebarOpen && (
              <Label className={`${playWrite.className} text-lg`}>Bazar</Label>
            )}
          </Link>
          <Button
            onClick={() => {
              closeSidebar();
            }}
            className="md:hidden bg-transparent"
            size={"icon"}
          >
            {" "}
            <BiExit size={22} />
          </Button>
        </div>
        <Separator className="dark:bg-neutral-300 bg-neutral-800 h-[2px] w-20 flex m-auto" />
        <nav
          className={`flex flex-col gap-2 mt-6 ${
            !props.sidebarOpen ? "items-center" : ""
          } w-full p-2`}
        >
          <SidebarItem
            open={props.sidebarOpen}
            title="Dashboard"
            icon={<TbLayoutDashboard size={22} />}
            href="/control-panel/dashboard"
            identifier="dashboard"
            subitems={[
              {
                title: "Statistics",
                href: "/control-panel/dashboard/",
              },
              {
                title: "Top Products",
                href: "/control-panel/dashboard/top-products",
              },
              {
                title: "Traffic Analytics",
                href: "/control-panel/dashboard/traffic-analytics",
              },
            ]}
          />

          <SidebarItem
            open={props.sidebarOpen}
            title="Product Management"
            icon={<BsBoxes size={22} />}
            href="#"
            identifier="products"
            subitems={[
              {
                title: "Add Product",
                href: "/control-panel/products/add_product",
              },
              {
                title: "Product List",
                href: "/control-panel/products/productList",
              },
            ]}
          />
          <SidebarItem
            open={props.sidebarOpen}
            title="Orders Management"
            icon={<CiBoxList size={22} />}
            href="#"
            identifier="orders"
            subitems={[
              { title: "Orders", href: "/control-panel/orders" },
              { title: "Statistics", href: "/control-panel/orders/statistics" },
            ]}
          />
          <SidebarItem
            open={props.sidebarOpen}
            title="Attributes"
            icon={<MdEditAttributes size={22} />}
            href="/control-panel/attributes"
            identifier="attributes"
          />
          <SidebarItem
            open={props.sidebarOpen}
            title="Categories"
            icon={<TbCategory2 size={22} />}
            href="/control-panel/categories"
            identifier="categories"
          />
     
          <SidebarItem
            open={props.sidebarOpen}
            title="Charts"
            icon={<BiChart size={22} />}
            href="/control-panel/charts"
            identifier="charts"
          />
        </nav>
      </div>
    </>
  );
}

type SidebarItemProps = {
  open: boolean;
  icon: React.ReactElement;
  title: string;
  href: string;
  identifier: string;
  subitems?: { title: string; href: string }[];
};

const SidebarItem = ({
  open,
  icon,
  title,
  href,
  subitems,
  identifier,
}: SidebarItemProps) => {
  const [subitemsOpen, setSubitemsOpen] = useState(false);

  const handleItemClick = () => {
    if (subitems && subitems.length > 0) {
      setSubitemsOpen(!subitemsOpen);
    }
  };

  return (
    <div className="">
      <div onClick={handleItemClick} className="cursor-pointer">
        <Link
          href={href}
          className={`flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 h-8 px-2 rounded-md`}
        >
          <div className="flex items-center gap-2 text-sm">
            {icon}
            {open && <span>{title}</span>}
          </div>
          {open && subitems && subitems.length > 0 && (
            <div className="">
              {subitemsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          )}
        </Link>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          subitemsOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {open && subitemsOpen && subitems && (
          <div className="flex flex-col items-start pl-4 pr-1 w-full text-sm py-2">
            {subitems.map((subitem, index) => (
              <Link
                key={index}
                href={subitem.href}
                className="rounded-sm flex items-center w-full p-1 px-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-all"
              >
                <span className="">{subitem.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
