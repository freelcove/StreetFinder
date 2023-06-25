"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useSession, getSession } from "next-auth/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MyComponent() {
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      // Manually update session
      getSession().then(session => console.log("session refreshed"));
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
      {/* Navbar */}
      <nav className="bg-transparent shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-3xl font-bold">
            Street Finder
          </div>
          <div className="flex justify-between items-center gap-5 text-lg">
            <Link href="/singleplayer">
              <p className="hover:text-indigo-200 cursor-pointer">SINGLEPLAYER</p>
            </Link>
            <Link href="/multiplayer">
              <p className="hover:text-indigo-200 cursor-pointer">MULTIPLAYER</p>
            </Link>
            <Link href="/apitest">
              <p className="hover:text-indigo-200 cursor-pointer">API Test</p>
            </Link>
            <Link href="/chat">
              <p className="hover:text-indigo-200 cursor-pointer">Chat</p>
            </Link>
            <Link href="/maptest">
              <p className="hover:text-indigo-200 cursor-pointer">Map Test</p>
            </Link>
            <Link href="/landing">
              <p className="hover:text-indigo-200 cursor-pointer">Landing Page Test</p>
            </Link>
            <Link href="/auth">
              <p className="hover:text-indigo-200 cursor-pointer">Auth</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Street Finder!</h1>
            <p className="text-2xl">Discover the streets like never before</p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-16">
            {/* Cards */}
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md text-black">
              <h3 className="text-lg font-semibold mb-4">Explore Streets</h3>
              <p>Find streets with ease and learn about different pathways and alleys.</p>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md text-black">
              <h3 className="text-lg font-semibold mb-4">Community Chat</h3>
              <p>Join the community chat and engage with other street explorers.</p>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-md text-black">
              <h3 className="text-lg font-semibold mb-4">Custom Maps</h3>
              <p>Create your custom maps and share your street adventures.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              &copy; 2023 Street Finder, Inc.
            </div>
            <div className="flex justify-between items-center gap-5 text-gray-700">
              <Link href="/privacy">
                <p>Privacy Policy</p>
              </Link>
              <Link href="/terms">
                <p>Terms of Service</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
