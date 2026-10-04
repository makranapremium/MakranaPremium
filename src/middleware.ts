import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/session";

const publicRoutes = ["/login"];
const protectedRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/blogs",
  "/admin/products",
  "/admin/categories",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  const cookie = req.cookies.get("session")?.value;

  const session = await decrypt(cookie);
  

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  if (pathname == "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path", "/login"],
};
