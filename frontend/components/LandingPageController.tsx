import Image from 'next/image'

export default function LandingPageController({ onZoom }) {

    return (
        <>
            <Image
                src="/image/title1.png"
                loading="eager"
                width={380}
                height={380}
                alt="STREET FINDER"
                onClick={onZoom}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out hover:scale-105"
            
            
            />
        </>
    );
};


{/* <>
<button
    onClick={onZoom}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-black hover:text-white transition-colors duration-600"
    >
    STREET FINDER
</button>
</> */}