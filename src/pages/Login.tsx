import React from "react";
import ClerkAuth from "@/components/auth/ClerkAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Medical Office Portal
            </CardTitle>
            <CardDescription>
              Sign in to access your medical information and appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="mt-4">
                <ClerkAuth view="sign-in" redirectUrl="/dashboard" />
              </TabsContent>
              <TabsContent value="sign-up" className="mt-4">
                <ClerkAuth view="sign-up" redirectUrl="/dashboard" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
