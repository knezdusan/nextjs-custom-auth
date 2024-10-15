"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormSignIn from "./FormSignIn";
import { useState } from "react";

export default function DialogAuthRecoverySignIn() {
  const [isAuthRecoverySignInDialogOpen, setIsAuthRecoverySignInDialogOpen] = useState(true);

  return (
    <Dialog open={isAuthRecoverySignInDialogOpen} onOpenChange={setIsAuthRecoverySignInDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in with your new password</DialogTitle>
        </DialogHeader>
        <FormSignIn />
      </DialogContent>
    </Dialog>
  );
}
