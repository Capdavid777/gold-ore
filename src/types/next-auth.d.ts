import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    groups: string[];
    role?: string | null;
    email_verified?: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    groups?: string[];
    role?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    email?: string | null;
  }
}
