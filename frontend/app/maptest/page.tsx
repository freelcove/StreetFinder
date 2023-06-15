import Link from "next/link";

export default function page() {

    return (
        <div>
            <div className="flex justify-center items-center gap-5">
                <Link href="/maptest/1">
                    <p className="text-gray-800 hover:text-indigo-600">Test 1</p>
                </Link>
                <Link href="/maptest/2">
                    <p className="text-gray-800 hover:text-indigo-600">Test 2</p>
                </Link>
                <Link href="/maptest/3">
                    <p className="text-gray-800 hover:text-indigo-600">Test 3</p>
                </Link>
                <Link href="/maptest/4">
                    <p className="text-gray-800 hover:text-indigo-600">Test 4</p>
                </Link>
                <Link href="/maptest/5">
                    <p className="text-gray-800 hover:text-indigo-600">Test 5</p>
                </Link>
            </div>

        </div>
    )

}