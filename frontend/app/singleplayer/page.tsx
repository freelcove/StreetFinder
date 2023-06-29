import Link from "next/link"

export default function PracticePage() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <p className="font-bold">How to play</p>
            <p>1. 거리뷰를 보고 어딘지 추측하기</p>
            <p>2. 지도에 예상 위치를 클릭</p>
            <p>3. Guess 버튼을 클릭</p>
            <br></br>

            <Link href="/singleplayer/play">
                <button className="mt-2 bg-gray-950 text-white text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl px-2 sm:px-2 md:px-3 lg:px-3 xl:px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200">
                    Play
                </button>
                </Link>
        </div>
    )
}