"use client";

import type { User as FirebaseUser, AuthError } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import type { LoginFormData, RegisterFormData } from '@/types';


interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signUp: (data: RegisterFormData) => Promise<FirebaseUser | null>;
  signIn: (data: LoginFormData) => Promise<FirebaseUser | null>;
  auth: typeof auth; // Expose the auth object
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (data: RegisterFormData): Promise<FirebaseUser | null> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      setUser(userCredential.user);
      toast({
        title: "Registration Successful",
        description: "Welcome! You have been successfully registered.",
        variant: "default", // Default is fine, or use a success variant if defined
      });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing up:", authError);
      toast({
        title: "Registration Failed",
        description: authError.message || "An unexpected error occurred.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: LoginFormData): Promise<FirebaseUser | null> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      setUser(userCredential.user);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing in:", authError);
      toast({
        title: "Login Failed",
        description: authError.message || "Invalid email or password.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing out:", authError);
      toast({
        title: "Sign Out Failed",
        description: authError.message || "An error occurred while signing out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      auth, // Provide the auth object
      signOutUser,
    }),
    [user, loading, signUp, signIn, signOutUser, auth]
  );
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
