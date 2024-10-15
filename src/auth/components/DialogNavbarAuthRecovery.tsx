import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormAuthRecovery from "./FormAuthRecovery";

type DialogNavbarAuthRecoveryProps = {
  isAuthRecoveryDialogOpen: boolean;
  setIsAuthRecoveryDialogOpen: (value: boolean) => void;
};

export default function DialogNavbarAuthRecovery({
  isAuthRecoveryDialogOpen,
  setIsAuthRecoveryDialogOpen,
}: DialogNavbarAuthRecoveryProps) {
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
