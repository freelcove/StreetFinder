"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: `/` });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Custom Sign In Page</h1>
      <button onClick={() => handleSignIn('google')}>Sign in with Google</button>
      <button onClick={() => handleSignIn('naver')}>Sign in with Naver</button>
    </div>
  );
}
