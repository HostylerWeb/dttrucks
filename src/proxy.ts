import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-DNS-Prefetch-Control": "on",
};

function withSecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function proxy(request: NextRequest) {
  if (process.env.FORCE_HTTPS === "true") {
    const proto = request.headers.get("x-forwarded-proto");
    if (proto === "http") {
      const httpsUrl = request.nextUrl.clone();
      httpsUrl.protocol = "https";
      return withSecurityHeaders(NextResponse.redirect(httpsUrl, 308));
    }
  }

  const session = await auth();
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !session) {
    return withSecurityHeaders(
      NextResponse.redirect(new URL("/admin/login", request.url))
    );
  }

  if (isLoginPage && session) {
    return withSecurityHeaders(NextResponse.redirect(new URL("/admin", request.url)));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
