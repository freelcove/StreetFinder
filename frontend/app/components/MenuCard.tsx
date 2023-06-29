"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SignIn from "./SignIn";

export const MenuCard: React.FC = () => {
    const cities = ['대구'];
    const modes = ['Practice', 'Multiplayer'];
    const [currentCity, setCurrentCity] = useState('대구');
    const [currentMode, setCurrentMode] = useState('Multiplayer');

    const nextCity = () => {
        const index = cities.indexOf(currentCity);
        const newIndex = index === cities.length - 1 ? 0 : index + 1;
        setCurrentCity(cities[newIndex]);
    }
    const nextMode = () => {
        const index = modes.indexOf(currentMode);
        const newIndex = index === modes.length - 1 ? 0 : index + 1;
        setCurrentMode(modes[newIndex]);
    }

    const { data: session } = useSession();
    const isLogged = session?.user ? true : false;
    const link = currentMode === 'Practice' ? '/singleplayer' : '/multiplayer';

    return (
        <div className="bg-gray-100 bg-opacity-50 shadow-lg rounded-lg p-3 sm:p-5 md:p-5 lg:p-5 xl:p-5 flex flex-col items-center w-full h-full">
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3">Street Finder</h2>

            {!isLogged ? (
                <>
                    <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4">
                        <SignIn />
                    </div>
                </>
            ) : (
                <>

                    <div className="w-full flex flex-col gap-1 items-start">
                        <div onClick={nextCity} className="flex gap-5 hover:text-blue-700 duration-100  font-semibold text-xs sm:text-sm md:text-base lg:text-base xl:text-base">
                            <p className="font-medium">City:</p>
                            {currentCity}
                        </div>
                        <div onClick={nextMode} className="flex gap-2 hover:text-blue-700  font-semibold text-xs sm:text-sm md:text-base lg:text-base xl:text-base">
                            <p className="font-medium">Mode:</p>
                            {currentMode}
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Link href={link}>
                            <button className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-200">
                                Play
                            </button>
                        </Link>
                        <button className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 xl:mt-4 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
