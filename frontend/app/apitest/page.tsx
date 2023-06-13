"use client";

import { useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Data {
    message: string;
}

export default function Page() {
    const [data, setData] = useState<Data | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${backendUrl}/hello`, {
                method: "GET",
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-4xl text-center">API TEST</h1>
                <br />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={fetchData}
                >
                    Fetch
                </button>
                <br />
                {data ? (
                    <p className="text-center mt-4">{data.message}</p>
                ) : (
                    <p className="text-center mt-4">버튼을 눌러서 Fetch</p>
                )}
        </div>
    );
}
