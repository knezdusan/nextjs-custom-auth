import Link from "next/link";
import Image from "next/image";
import NavbarMain from "./NavbarMain";
import NavbarAuth from "@/auth/components/NavbarAuth";

export default function Navbar() {
  return (
    <div className="navbar flex justify-between p-0 items-center">
      <Link href="/">
        <Image src="/images/logo.png" alt="Logo" title="Back to home" width="150" height="34" />
      </Link>
      <NavbarMain />
      <NavbarAuth />
    </div>
  );
}
