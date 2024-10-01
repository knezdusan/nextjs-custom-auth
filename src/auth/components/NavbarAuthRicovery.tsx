import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserIcon, ChevronRight } from "lucide-react";
import FormAuthRecovery from "./FormAuthRecovery";
import Link from "next/link";

type NavbarAuthRecoveryProps = {
  isAuthRecoveryDialogOpen: boolean;
  setIsAuthRecoveryDialogOpen: (value: boolean) => void;
};

export default function NavbarAuthRecovery({
  isAuthRecoveryDialogOpen,
  setIsAuthRecoveryDialogOpen,
}: NavbarAuthRecoveryProps) {
  return (
    <Dialog open={isAuthRecoveryDialogOpen} onOpenChange={setIsAuthRecoveryDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
        </DialogHeader>
        <FormAuthRecovery />
      </DialogContent>
    </Dialog>
  );
}
