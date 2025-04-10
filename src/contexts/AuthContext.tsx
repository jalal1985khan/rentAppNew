'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential, RecaptchaVerifier } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface UserData {
  id: string;
  name: string | null;
  phone: string;
  photoURL?: string;
  role?: string;
}

interface SessionUser {
  id: string;
  phone: string;
}

interface AuthContextType {
  user: SessionUser | null;
  userData: UserData | null;
  loading: boolean;
  signInWithPhone: (phoneNumber: string) => Promise<string>;
  verifyOTP: (verificationId: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.phone) {
        try {
          const response = await fetch(`/api/users?phone=${encodeURIComponent(session.user.phone)}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [session]);

  const signInWithPhone = async (phoneNumber: string): Promise<string> => {
    try {
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      return result.verificationId;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const verifyOTP = async (verificationId: string, otp: string): Promise<void> => {
    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result found. Please try sending OTP again.');
      }

      const result = await confirmationResult.confirm(otp);
      
      if (result.user) {
        await signIn('firebase-phone', {
          id: result.user.uid,
          phone: result.user.phoneNumber,
          redirect: false,
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      // Sign out from Firebase
      await auth.signOut();
      // Sign out from NextAuth
      await signOut({ redirect: false });
      // Clear local state
      setUserData(null);
      setConfirmationResult(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user: session?.user as SessionUser | null,
    userData,
    loading: status === 'loading' || loading,
    signInWithPhone,
    verifyOTP,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 