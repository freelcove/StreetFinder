import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import SignIn from "../auth/signin/page";

export const MultiplayerCard: React.FC = () => {
    const { data: session } = useSession();
    const isLogged = session?.user ? true : false;

    return (
        <div className="bg-gray-200 shadow-lg rounded-lg p-5 flex flex-col items-center w-full h-full">
            <h2 className="text-3xl font-bold mb-3">MULTIPLAYER</h2>
            <p>Some introduction to Multiplayer mode.</p>
            {!isLogged ? (
                <SignIn />
            ) : (
                <>
                    <Link href="/multiplayer">
                        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded w-full hover:bg-blue-700">
                            Join Room
                        </button>
                    </Link>
                    <button
                        className="text-sm font-bold duration-300 ease-in-out hover:scale-105"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </>
            )}
        </div>
    )
}
