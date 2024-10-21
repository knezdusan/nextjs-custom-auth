"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FormPasswordReset from "./FormPasswordReset";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

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
      <DialogTrigger asChild>
        <Button variant="outline">Setup New Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup New Password</DialogTitle>
        </DialogHeader>
        <FormPasswordReset email={email} />
      </DialogContent>
    </Dialog>
  );
}
