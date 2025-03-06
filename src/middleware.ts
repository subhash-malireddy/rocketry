import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.cookies.get("token")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.href);
    return NextResponse.redirect(url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
