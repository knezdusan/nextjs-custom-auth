"use client";

import NavbarAuthSignUp from "./NavbarAuthSignUp";
import NavbarAuthSignIn from "./NavbarAuthSignIn";
import { useState } from "react";
import NavbarAuthRecovery from "./NavbarAuthRicovery";

export default function NavbarAuth() {
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const openSignInDialog = () => {
    setIsSignUpDialogOpen(false);
    setIsAuthDialogOpen(false);
    setIsSignInDialogOpen(true);
  };
  const openSignUpDialog = () => {
    setIsSignInDialogOpen(false);
    setIsAuthDialogOpen(false);
    setIsSignUpDialogOpen(true);
  };

  const openAuthRecoveryDialog = () => {
    setIsSignInDialogOpen(false);
    setIsSignUpDialogOpen(false);
    setIsAuthDialogOpen(true);
  };

  return (
    <div className="flex gap-6">
      <NavbarAuthSignIn
        isSignInDialogOpen={isSignInDialogOpen}
        setIsSignInDialogOpen={setIsSignInDialogOpen}
        openSignUpDialog={openSignUpDialog}
        openAuthRecoveryDialog={openAuthRecoveryDialog}
      />
      <NavbarAuthSignUp
        isSignUpDialogOpen={isSignUpDialogOpen}
        setIsSignUpDialogOpen={setIsSignUpDialogOpen}
        openSignInDialog={openSignInDialog}
      />
      <NavbarAuthRecovery
        isAuthRecoveryDialogOpen={isAuthDialogOpen}
        setIsAuthRecoveryDialogOpen={setIsAuthDialogOpen}
      />
    </div>
  );
}
