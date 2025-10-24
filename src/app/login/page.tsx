'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { handleLoginSuccess } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginError = () => {
    setLoading(false);
    setError('Google login failed. Please try again.');
    toast.error('Google login failed. Please try again.');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4"> {/* 🆕 set pure black background */}
      <div className="w-full max-w-sm rounded-2xl bg-black p-10 text-center shadow-xl"> {/* 🆕 removed border & neutral tints */}

        
        {/* Logo */}
        <Image
          src="/CommuniFIlm_Logo.png"
          alt="CommuniFilm Logo"
          width={290}
          height={9}
          className="mx-auto mb-6"
        />

        {/* Headline */}
        <h1 className="text-3xl font-semibold mb-3 text-white">Welcome to CommuniFilm</h1>
        <p className="text-neutral-400 mb-6">Please sign in with Google</p>

        {/* Google Login Button */}
        <div className={`transition-all ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <GoogleLogin
            onSuccess={(res) => {
              setLoading(true);
              handleLoginSuccess(res);
              setLoading(false);
            }}
            onError={handleLoginError}
          />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <p className="mt-3 text-neutral-400 text-sm">Signing you in…</p>
        )}

        {/* Inline Error Message */}
        {error && (
          <p className="mt-3 text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}

        {/* Privacy / Terms Note */}
        <p className="mt-6 text-xs text-neutral-500">
          By signing in, you agree to our{' '}
          <a href="#" className="underline hover:text-neutral-300">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-neutral-300">
            Privacy Policy
          </a>.
        </p>
      </div>
    </main>
  );
}
