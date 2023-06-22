import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        <Link href="/maptest/1">
          <p className="text-gray-800 hover:text-indigo-600">1. 일반 맵</p>
        </Link>
        <Link href="/maptest/2">
          <p className="text-gray-800 hover:text-indigo-600">2. 파노라마</p>
        </Link>
        <Link href="/maptest/3">
          <p className="text-gray-800 hover:text-indigo-600">3. 파노라마 + 맵</p>
        </Link>
        <Link href="/maptest/4">
          <p className="text-gray-800 hover:text-indigo-600">4. 랜덤 좌표 및 거리 계산</p>
        </Link>
        <Link href="/maptest/5">
          <p className="text-gray-800 hover:text-indigo-600">5. 위성 + 줌인</p>
        </Link>
      </div>
    </div>
  );
}
