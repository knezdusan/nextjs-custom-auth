import Link from "next/link";
import Image from "next/image";
import NavbarMain from "./NavbarMain";
import NavbarAuth from "@/auth/components/NavbarAuth";
import { verifyAuthSession, deleteAuthSession } from "@/auth/session";
import NavbarSignOut from "@/auth/components/NavbarSignOut";

export default async function Navbar() {
  const authSession = await verifyAuthSession();

  return (
    <div className="navbar flex justify-between p-0 items-center">
      <Link href="/">
        <Image src="/images/logo.png" alt="Logo" title="Back to home" width="150" height="34" />
      </Link>
      <NavbarMain />

      {!authSession ? <NavbarAuth /> : <NavbarSignOut />}
    </div>
  );
}
