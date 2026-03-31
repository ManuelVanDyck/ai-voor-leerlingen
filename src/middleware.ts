import { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/((?!login|api/auth).*)"],
};

export default middleware;
