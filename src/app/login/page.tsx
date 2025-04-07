'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { FirebaseError } from 'firebase/app';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const router = useRouter();
  const { signInWithPhone, verifyOTP } = useAuth();
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    setIsAnimating(true);
    // Initialize reCAPTCHA
    const auth = getAuth();
    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber to be called
      },
    });
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formattedPhone = phoneNumber.startsWith('+91') 
        ? phoneNumber 
        : `+91${phoneNumber}`;
      
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA not initialized');
      }

      const id = await signInWithPhone(formattedPhone);
      setVerificationId(id);
      setShowOtpInput(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-phone-number':
            setError('Please enter a valid phone number');
            break;
          case 'auth/too-many-requests':
            setError('Too many attempts. Please try again later');
            break;
          default:
            setError('Failed to send OTP. Please try again');
        }
      } else {
        setError('An unexpected error occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await verifyOTP(verificationId, otp);
      router.push('/');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-verification-code':
            setError('Invalid OTP. Please try again');
            break;
          case 'auth/code-expired':
            setError('OTP has expired. Please request a new one');
            break;
          default:
            setError('Failed to verify OTP. Please try again');
        }
      } else {
        setError('An unexpected error occurred. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* App-like Header */}
      <div className={`px-4 transform transition-all duration-500 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
            <DevicePhoneMobileIcon className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        <h1 className="mt-8 text-4xl font-bold text-black text-center">
          Welcome
        </h1>
        <p className="mt-4 text-black/90 text-center text-lg">
          Sign in to manage your properties
        </p>
      </div>

      {/* Login Form */}
      <div className={`mt-20 flex-1 bg-white border border-gray-300 rounded-t-[3rem] px-6 pt-10 pb-8 transform transition-all duration-500 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl shadow-sm">
            {error}
          </div>
        )}

        {/* reCAPTCHA Container */}
        <div id="recaptcha-container" className="hidden"></div>

        {!showOtpInput ? (
          <form onSubmit={handleSendOtp} className="space-y-8">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                Enter your phone number
              </label>
              <div className="relative rounded-2xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium text-lg">+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="block w-full pl-20 pr-5 py-5 border border-gray-300 bg-gray-50 rounded-2xl text-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                  placeholder="9876543210"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-4 bg-purple-600/50 rounded-2xl text-white font-semibold text-xl shadow-lg hover:bg-purple-600/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-8">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-3">
                Enter the OTP sent to +91 {phoneNumber}
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-5 py-5 border border-gray-300 bg-gray-50 rounded-2xl text-2xl text-center tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                placeholder="000000"
                required
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-4 bg-purple-600/50 rounded-2xl text-white font-semibold text-xl shadow-lg hover:bg-purple-600/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowOtpInput(false);
                  setOtp('');
                }}
                className="text-primary font-medium hover:text-primary-dark transition-colors duration-200"
              >
                Change Phone Number
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 text-center text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </>
  );
} 