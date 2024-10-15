"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { deleteAuthSessionAction } from "../actions";

export default function DeleteAuthSession() {
  const handleLogout = async () => {
    await deleteAuthSessionAction(); // Call the server action
  };

  return (
    <Button variant="link" className="flex items-center" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
    </Button>
  );
}
