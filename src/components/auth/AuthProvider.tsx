import React, { createContext, useState, useContext } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create a mock auth context
interface MockAuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  signOut: () => Promise<void>;
  setIsSignedIn: (value: boolean) => void;
}

const MockAuthContext = createContext<MockAuthContextType>({
  isSignedIn: false,
  isLoaded: true,
  signOut: () => Promise.resolve(),
  setIsSignedIn: () => {},
});

// Create a hook to use the mock auth context
export const useMockAuth = () => useContext(MockAuthContext);

// Export a unified useAuth hook that works with both real and mock auth
export const useAuth = () => {
  try {
    // Try to use the real Clerk useAuth if available
    const clerkUseAuth = require("@clerk/clerk-react").useAuth;
    return clerkUseAuth();
  } catch (error) {
    // Fall back to our mock auth if Clerk's useAuth fails
    return useMockAuth();
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  // Use a mock key for development if no key is provided
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

  // Check if we're using no key or an invalid key
  const shouldUseMockAuth =
    !clerkPubKey || clerkPubKey === "your_clerk_publishable_key";

  if (shouldUseMockAuth) {
    // Instead of using ClerkProvider with an invalid key, render a mock auth context
    return (
      <div className="flex flex-col">
        <div className="bg-amber-100 text-amber-800 p-2 text-sm text-center">
          ⚠️ Using mock authentication. Add your Clerk publishable key to
          .env.local file.
        </div>
        <MockAuthProvider>{children}</MockAuthProvider>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      {children}
    </ClerkProvider>
  );
};

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Create the mock auth value
  const mockAuthValue = {
    isSignedIn,
    isLoaded: true,
    signOut: () => {
      setIsSignedIn(false);
      return Promise.resolve();
    },
    setIsSignedIn,
  };

  // Make the mock auth available globally for components that directly import from Clerk
  React.useEffect(() => {
    // @ts-ignore - Patching the global namespace for development only
    window.Clerk = window.Clerk || {};
    // @ts-ignore
    window.Clerk.__unstable_mockUseAuth = () => mockAuthValue;
  }, [isSignedIn]);

  return (
    <MockAuthContext.Provider value={mockAuthValue}>
      {children}
    </MockAuthContext.Provider>
  );
};

export default AuthProvider;
