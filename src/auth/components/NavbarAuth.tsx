"use client";

import DialogNavbarAuthSignUp from "./DialogNavbarAuthSignUp";
import DialogNavbarAuthSignIn from "./DialogNavbarAuthSignIn";
import DialogNavbarAuthVerify from "./DialogNavbarAuthVerify";
import DialogNavbarAuthRecovery from "./DialogNavbarAuthRecovery";

import { useState } from "react";

export default function NavbarAuth() {
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthVerifyDialogOpen, setIsAuthVerifyDialogOpen] = useState(false);

  const openSignInDialog = () => {
    setIsSignInDialogOpen(true);
    setIsSignUpDialogOpen(false);
    setIsAuthDialogOpen(false);
    setIsAuthVerifyDialogOpen(false);
  };
  const openSignUpDialog = () => {
    setIsSignUpDialogOpen(true);
    setIsSignInDialogOpen(false);
    setIsAuthDialogOpen(false);
    setIsAuthVerifyDialogOpen(false);
  };

  const openAuthRecoveryDialog = () => {
    setIsAuthDialogOpen(true);
    setIsSignInDialogOpen(false);
    setIsSignUpDialogOpen(false);
    setIsAuthVerifyDialogOpen(false);
  };

  const openAuthVerifyDialog = () => {
    setIsAuthVerifyDialogOpen(true);
    setIsAuthDialogOpen(false);
    setIsSignInDialogOpen(false);
    setIsSignUpDialogOpen(false);
  };

  return (
    <div className="flex gap-6">
      <DialogNavbarAuthSignIn
        isSignInDialogOpen={isSignInDialogOpen}
        setIsSignInDialogOpen={setIsSignInDialogOpen}
        openSignUpDialog={openSignUpDialog}
        openAuthRecoveryDialog={openAuthRecoveryDialog}
      />
      <DialogNavbarAuthSignUp
        isSignUpDialogOpen={isSignUpDialogOpen}
        setIsSignUpDialogOpen={setIsSignUpDialogOpen}
        openSignInDialog={openSignInDialog}
        openAuthVerifyDialog={openAuthVerifyDialog}
      />
      <DialogNavbarAuthRecovery
        isAuthRecoveryDialogOpen={isAuthDialogOpen}
        setIsAuthRecoveryDialogOpen={setIsAuthDialogOpen}
      />
      <DialogNavbarAuthVerify
        isAuthVerifyDialogOpen={isAuthVerifyDialogOpen}
        setIsAuthVerifyDialogOpen={setIsAuthVerifyDialogOpen}
      />
    </div>
  );
}
