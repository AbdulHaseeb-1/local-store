import { auth } from "@/lib/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl, auth }: any = req;
    const baseUrl = nextUrl.origin;
    if (!auth?.user) {
        return NextResponse.redirect(new URL("/", baseUrl));
    }
})

export const config = {
    matcher: ["/control-panel/:path*"],
}