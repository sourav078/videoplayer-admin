// next.js middleware

import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

const ProtectedRoutes = [
  "/",
  "/groups",
  "/permission",
  "/roles",
  "/users",
  "/dashboard",
  "/dashboard",
];

const AuthenticatedRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && ProtectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // if user is authenticated and tries to access login page, redirect to dashboard

  if (token && AuthenticatedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
