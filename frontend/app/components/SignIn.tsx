"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: `/multiplayer` });
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <p className="hidden md:block md:text-base font-bold">Sign in with</p>
      <button 
        className="bg-white shadow-md hover:shadow-lg rounded-md w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center transition-shadow duration-200 ease-in-out" 
        onClick={() => handleSignIn("google")}
      >
        <Image 
          src="/image/googlelogo.svg" 
          alt="Google Signin" 
          width={20} 
          height={20} 
          className="sm:w-4 sm:h-4 md:w-6 md:h-6" 
        />
      </button>
      {/* <button 
        className="bg-white shadow-md hover:shadow-lg rounded-md w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center transition-shadow duration-200 ease-in-out" 
        onClick={() => handleSignIn("naver")}
      >
        <Image 
          src="/image/naverlogo.svg" 
          alt="Naver Signin" 
          width={20} 
          height={20} 
          className="sm:w-4 sm:h-4 md:w-6 md:h-6" 
        />
      </button> */}
    </div>
  );
}
