// src/middleware.ts
export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/portal/:path*"],
};
