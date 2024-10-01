import Link from "next/link";

export default function NavbarMain() {
  return (
    <nav className="hidden md:flex justify-centergap-4 gap-6">
      <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
        About
      </Link>
      <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
        Services
      </Link>
      <Link href="#" className="font-medium flex items-center text-sm transition-colors hover:underline">
        Contact
      </Link>
    </nav>
  );
}
