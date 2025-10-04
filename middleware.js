// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("123456789");

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Agar token nahi mila
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    // Invalid token → redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Sirf /newTodus ko protect karna
export const config = {
  matcher: ["/newTodus/:path*"],
};
