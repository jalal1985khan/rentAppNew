import { NextAuthOptions } from 'next-auth';
import { connectToDatabase } from './mongodb';
import { getAuth, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      phone?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'firebase-phone',
      name: 'Firebase Phone',
      type: 'credentials',
      credentials: {
        verificationId: { label: "Verification ID", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.verificationId || !credentials?.otp) {
          throw new Error('Please enter verification ID and OTP');
        }

        try {
          // Create credential with verification ID and OTP
          const credential = PhoneAuthProvider.credential(
            credentials.verificationId,
            credentials.otp
          );

          // Sign in with Firebase
          const userCredential = await signInWithCredential(auth, credential);
          const firebaseUser = userCredential.user;

          if (!firebaseUser) {
            throw new Error('Failed to authenticate with Firebase');
          }

          const client = await connectToDatabase();
          const db = client.db();
          
          // Find or create user in your database
          const result = await db.collection('users').findOneAndUpdate(
            { phone: firebaseUser.phoneNumber },
            { 
              $setOnInsert: { 
                name: firebaseUser.displayName || '',
                phone: firebaseUser.phoneNumber,
                createdAt: new Date()
              }
            },
            { upsert: true, returnDocument: 'after' }
          );

          if (!result.value) {
            throw new Error('Failed to create or update user');
          }

          return {
            id: result.value._id.toString(),
            name: result.value.name,
            phone: result.value.phone,
          };
        } catch (error) {
          console.error('Firebase authentication error:', error);
          throw new Error('Failed to authenticate with Firebase');
        }
      }
    }
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}; 