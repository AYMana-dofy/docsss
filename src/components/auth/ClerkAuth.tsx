import React from "react";
import { SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";

interface ClerkAuthProps {
  view?: "sign-in" | "sign-up" | "user-button";
  redirectUrl?: string;
}

const ClerkAuth = ({
  view = "sign-in",
  redirectUrl = "/dashboard",
}: ClerkAuthProps) => {
  const { isSignedIn, signOut } = useAuth();

  if (isSignedIn && view === "user-button") {
    return (
      <div className="flex items-center gap-2">
        <UserButton afterSignOutUrl="/" />
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  if (view === "sign-in") {
    return (
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <SignIn redirectUrl={redirectUrl} />
      </div>
    );
  }

  if (view === "sign-up") {
    return (
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <SignUp redirectUrl={redirectUrl} />
      </div>
    );
  }

  return null;
};

export default ClerkAuth;
