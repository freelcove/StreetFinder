import Link from "next/link";
import React from "react";

export const SingleplayerCard: React.FC = () => {
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 xl:p-5 flex flex-col items-center w-full h-full">
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3">SINGLEPLAYER</h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-base font-medium">Daegu</p>
            <div className="flex gap-1 justify-center">
            <Link href="/singleplayer">
                <button className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200">
                    Play
                </button>
            </Link>
            </div>
        </div>
    )
}
