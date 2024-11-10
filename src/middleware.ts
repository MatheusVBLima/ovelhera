import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "../src/lib/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("__Secure-next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL(getUrl("/historias")));
  }

  if (pathname.includes("/admin") && !token) {
    return NextResponse.redirect(new URL(getUrl("/")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
