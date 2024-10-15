import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DialogNavbarAuthVerifyProps = {
  isAuthVerifyDialogOpen: boolean;
  setIsAuthVerifyDialogOpen: (value: boolean) => void;
};

export default function DialogNavbarAuthVerify({
  isAuthVerifyDialogOpen,
  setIsAuthVerifyDialogOpen,
}: DialogNavbarAuthVerifyProps) {
  return (
    <Dialog open={isAuthVerifyDialogOpen} onOpenChange={setIsAuthVerifyDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Verification Required</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          <p>
            Thank you for signing up! 🎉
            <br />
            You will receive a verification email within a few minutes.
            <br />
            <br />
            To activate your account, please check your inbox (and spam folder, just in case) and click the link in the
            email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
