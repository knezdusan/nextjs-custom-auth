"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { deleteAuthSession } from "../session";

export default function NavbarAuthSignOut() {
  const handleLogout = async () => {
    await deleteAuthSession(); // Call the server action
  };

  return (
    <Button variant="link" className="flex items-center" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}
