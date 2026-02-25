import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req, secret: process.env.NEXTAUTH_SECRET,
    });

    const {pathname} =  req.nextUrl;

    if (
        pathname === "/" ||
        pathname.startsWith("/products") ||
        pathname.startsWith("/category") || 
        pathname.startsWith("/login") ||
        pathname.startsWith("/api")
    ) {return NextResponse.next()};

    if (pathname.startsWith("/dashboard")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

    if (pathname.startsWith("/favorites")) {
        if (!token || !token.id) {
            return NextResponse.redirect(new URL("/login",req.url));
        } return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/favorites/:path*"],
};