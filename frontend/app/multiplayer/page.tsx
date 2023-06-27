import Link from "next/link"

export default function MultiplayerPage() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <p className="font-bold">How to play</p>
            <p>1. 거리뷰를 보고 여기가 어딘지 추측</p>
            <p>2. 지도에 예상 위치를 클릭</p>
            <p>3. 누구든지 먼저 1km 반경 이내로 맞추면 15초 뒤 라운드 종료</p>
            
            <br></br>
            
            <Link href="/multiplayer/play">
                <p className="text-gray-800 font-bold text-2xl hover:text-indigo-600">Play</p>
            </Link>
        </div>
    )
}