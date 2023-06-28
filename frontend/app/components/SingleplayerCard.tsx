import Link from "next/link";
import React from "react";

export const SingleplayerCard: React.FC = () => {
    return (
        <div className="shadow-lg rounded-lg p-5 items-center bg-gray-200 w-full h-full">
            <h2 className="text-3xl font-bold mb-3">SINGLEPLAYER</h2>
            <p>Some introduction to Singleplayer mode.</p>
            <Link href="/singleplayer">
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded w-full hover:bg-blue-700">
                    Play
                </button>
            </Link>
        </div>
    )
}
