import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import SignIn from "../auth/signin/page";

export const MultiplayerCard: React.FC = () => {
    const { data: session } = useSession();
    const isLogged = session?.user ? true : false;

    return (
        <div className="bg-gray-200 shadow-lg rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 xl:p-5 flex flex-col items-center w-full h-full">
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3">MULTIPLAYER</h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-medium">Daegu</p>
            {!isLogged ? (
                <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4">
                    <SignIn />
                </div>
            ) : (
                <div className="flex gap-1">
                    <Link href="/multiplayer">
                    <button className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200">
                            Play
                        </button>
                    </Link>

                    <button className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
