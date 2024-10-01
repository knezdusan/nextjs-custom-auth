import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserIcon, ChevronRight } from "lucide-react";
import FormSignIn from "./FormSignIn";
import Link from "next/link";

type NavbarAuthSignInProps = {
  isSignInDialogOpen: boolean;
  setIsSignInDialogOpen: (value: boolean) => void;
  openSignUpDialog: () => void;
  openAuthRecoveryDialog: () => void;
};

export default function NavbarAuthSignup({
  isSignInDialogOpen,
  setIsSignInDialogOpen,
  openSignUpDialog,
  openAuthRecoveryDialog,
}: NavbarAuthSignInProps) {
  return (
    <Dialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="flex items-center px-0 gap-2">
          <UserIcon className="h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to EntryFrame</DialogTitle>
        </DialogHeader>
        <FormSignIn />
        <section className="text-center text-xs text-muted-foreground">
          <div className="">
            Don&apos;t have an account?
            <Button variant="link" className="px-0 relative left-1 text-xs h-5" onClick={openSignUpDialog}>
              Create one here. <ChevronRight className="inline h-3 w-3" />
            </Button>
          </div>
          <div className="">
            Forgot your password?
            <Button variant="link" className="px-0 relative left-1 text-xs h-5" onClick={openAuthRecoveryDialog}>
              Get a recovery email. <ChevronRight className="inline h-3 w-3" />
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
