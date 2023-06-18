"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const AuthPage = () => {
    const { data: session } = useSession();
    console.log({session});
   


    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {session?.user ? (
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Welcome, {session.user.email}
                            
                        </h2>
                        <p>
                            {session.accessToken}
                            </p>
                    </div>
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
                        onClick={() => signIn()}
                    >
                        Sign In
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
