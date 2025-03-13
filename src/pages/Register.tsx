import React from "react";
import ClerkAuth from "@/components/auth/ClerkAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Create Your Account
            </CardTitle>
            <CardDescription>
              Register to access the Medical Office Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClerkAuth view="sign-up" redirectUrl="/dashboard" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
