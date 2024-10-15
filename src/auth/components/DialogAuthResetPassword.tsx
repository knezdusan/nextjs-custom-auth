"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FormPasswordReset from "./FormPasswordReset";

export default function DialogAuthResetPassword({ email }: { email: string }) {
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsPasswordResetOpen(false);
  }, [pathname, setIsPasswordResetOpen]);

  useEffect(() => {
    setIsPasswordResetOpen(true);
  }, [email, setIsPasswordResetOpen]);

  return (
    <Dialog open={isPasswordResetOpen} onOpenChange={setIsPasswordResetOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup New Password</DialogTitle>
        </DialogHeader>
        <FormPasswordReset email={email} />
      </DialogContent>
    </Dialog>
  );
}
