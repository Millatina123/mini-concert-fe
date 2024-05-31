import Cookies from "js-cookie";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/customer")) {
    if (!request.cookies.get("authToken")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/sign-in") || request.nextUrl.pathname.startsWith("/sign-up")) {
    if (request.cookies.get("authToken")) {
      var user_object = JSON.parse(request.cookies.get("user").value);
      var role = user_object.user.role;
      if (role === "USER") {
        return NextResponse.redirect(new URL("/customer", request.url));
      } else {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/sign-in/:path*"],
};

function getUserRole(request) {}
