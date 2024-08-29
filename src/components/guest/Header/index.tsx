import Link from "next/link";
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import { BiUser } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { FiShoppingBag } from "react-icons/fi";
import LocalFont from "next/font/local";
import { NavigationMenuItems } from "./NavigationMenuItems";
import ShoppingCart from "./ShoppingCart";
import PhoneDropDown from "./PhoneDropDown";



const playWrite = LocalFont({
  src: "../../../fonts/PlaywriteNGModern-Regular.ttf",
  variable: "--font-play",
})



const NavigationBar = async () => {
  const session = await auth();

  return (
    <header id="navbar" className="sticky h-14  dark:bg-neutral-900 bg-white  image top-0 z-40 flex w-full ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 gap-4 shadow-2 ">
        <div className="flex items-center gap-5 md:gap-10  ">
          {/* ======================-Logo============== */}
          <Link href="/" className="flex gap-1 ">
            <FiShoppingBag color="#dddddd" size={28} className="bg-neutral-600 rounded-full py-[6px]" />
            <Label className={`${playWrite.className} text-lg `}>
              Bazar
            </Label>
          </Link>
          {/* ============== */}
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4 m-auto">
            <li><NavigationMenuItems /></li>
          </ul>
        </div>
        <div className="flex items-center gap-3  justify-center">
          <ul className="flex items-center gap-2 ">
            <li>
              <DarkModeSwitcher />
            </li>
            {session && <li>
              <Link href={"/control-panel/dashboard"}>
                <BiUser size={22} />
              </Link>
            </li>}
            <li >
              <ShoppingCart />
            </li>
            <li className="md:hidden" >
              <PhoneDropDown />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;


