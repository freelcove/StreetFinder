import Link from "next/link"

export default function PracticePage() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <p className="font-bold">How to play</p>
            <p>1. 거리뷰를 보고 여기가 어딘지 추측하기</p>
            <p>2. 지도에 예상 위치를 클릭</p>
            <p>3. Guess 버튼을 클릭</p>
            <br></br>
            
            <Link href="/singleplayer/play">
                <p className="text-gray-800 font-bold text-2xl hover:text-indigo-600">Play</p>
            </Link>
        </div>
    )
}