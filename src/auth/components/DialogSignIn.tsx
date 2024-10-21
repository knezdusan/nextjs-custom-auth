"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormSignIn from "./FormSignIn";
import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function DialogSignIn({ title }: { title: string }) {
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(true);

  return (
    <Dialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormSignIn />
      </DialogContent>
    </Dialog>
  );
}
