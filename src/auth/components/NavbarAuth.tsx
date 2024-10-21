import { verifyAuthSession } from "@/auth/session";
import NavbarAuthSignInUp from "./NavbarAuthSignInUp";
import NavbarAuthSignOut from "@/auth/components/NavbarAuthSignOut";

export default async function NavbarAuth() {
  const authSession = await verifyAuthSession();

  return !authSession ? <NavbarAuthSignInUp /> : <NavbarAuthSignOut />;
}
