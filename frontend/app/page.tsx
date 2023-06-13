"use client";

import Link from 'next/link';
import {useEffect} from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {


  useEffect(() => {
    fetch(`${backendUrl}/warmup`, {
      method: 'GET',
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-semibold text-gray-700">
            Street Finder
          </div>
          <div className="flex justify-between items-center gap-5">
            <Link href="/apitest">
              <p className="text-gray-800 hover:text-indigo-600">API Test</p>
            </Link>
            <Link href="/chat">
              <p className="text-gray-800 hover:text-indigo-600">Chat</p>
            </Link>
            <Link href="/menu3">
              <p className="text-gray-800 hover:text-indigo-600">Menu 3</p>
            </Link>
            <Link href="/menu4">
              <p className="text-gray-800 hover:text-indigo-600">Menu 4</p>
            </Link>
            <Link href="/menu5">
              <p className="text-gray-800 hover:text-indigo-600">Menu 5</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Street Finder!</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Content */}
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                Content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Sidebar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sidebar</h3>
              <p className="text-gray-700">
                Additional content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
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
