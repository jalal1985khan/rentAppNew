'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: any | null;
  loading: boolean;
  logout: () => Promise<void>;
  sendOTP: (phoneNumber: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  logout: async () => {},
  sendOTP: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          await connectDB();
          const userDoc = await User.findOne({ phone: user.phoneNumber });
          setUserData(userDoc);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUserData(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const sendOTP = async (phoneNumber: string) => {
    try {
      // Format phone number if not already formatted
      const formattedPhone = phoneNumber.startsWith('+91') 
        ? phoneNumber 
        : `+91${phoneNumber}`;

      // Initialize reCAPTCHA
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow sendOtp
        }
      });

      // Send OTP
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifier
      );

      // Store confirmation result in window object for verification
      (window as any).confirmationResult = confirmationResult;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, sendOTP }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 