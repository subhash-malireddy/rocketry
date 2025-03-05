import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //* Do some Auth check here!
  //   const cookies = request.cookies;
  //   const isAuthenticated = cookies.get("auth_token") !== null;
  //   if (isAuthenticated) return;
  //! funny check to see if the user is authorized 🎃
  const query = request.nextUrl.searchParams;
  if (query.get("token")) return;
  const url = new URL("/login", request.url);
  url.searchParams.set("callbackUrl", request.nextUrl.href);
  return NextResponse.redirect(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
