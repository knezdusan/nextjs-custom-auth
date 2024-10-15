import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, UserPlusIcon } from "lucide-react";
import FormSignUp from "./FormSignUp";
import Link from "next/link";

type DialogNavbarAuthSignupProps = {
  isSignUpDialogOpen: boolean;
  setIsSignUpDialogOpen: (open: boolean) => void;
  openSignInDialog: () => void;
  openAuthVerifyDialog: () => void;
};

export default function DialogNavbarAuthSignup({
  isSignUpDialogOpen,
  setIsSignUpDialogOpen,
  openSignInDialog,
  openAuthVerifyDialog,
}: DialogNavbarAuthSignupProps) {
  return (
    <Dialog open={isSignUpDialogOpen} onOpenChange={setIsSignUpDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="flex items-center px-0 gap-2">
          <UserPlusIcon className="h-4 w-4" />
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Client Sign Up</DialogTitle>
        </DialogHeader>

        <FormSignUp openAuthVerifyDialog={openAuthVerifyDialog} />
        <section className="text-center text-xs text-muted-foreground">
          <div className="text-xs text-muted-foreground text-center">
            Already have an account?
            <Button variant="link" className="px-0 relative left-2 text-xs" onClick={openSignInDialog}>
              Login <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
          <div>
            By signing in you accept the{" "}
            <Link href="#" className="text-primary hover:underline">
              EntryFrame Terms of Service
            </Link>{" "}
            and acknowledge our{" "}
            <Link href="#" className="text-primary hover:underline ml-0">
              Privacy Policy
            </Link>
            .
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
