import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { BiMenu } from "react-icons/bi"

export default function PhoneDropDown() {
    return (
        <DropdownMenu >
            <div className="flex items-center">
                <DropdownMenuTrigger><BiMenu size={22} /></DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="">
                <Link href={"#"}>
                    <DropdownMenuItem>Products</DropdownMenuItem>
                </Link>
                <Link href={"#"}>
                <DropdownMenuItem>Categories</DropdownMenuItem>
                </Link>
                <Link href={"#"}>
                <DropdownMenuItem>Contact</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}