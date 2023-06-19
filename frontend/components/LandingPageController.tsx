export default function LandingPageController({ onZoom }) {

    return (
        <>
            <button
                onClick={onZoom}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-black hover:text-white transition-colors duration-600"
                >
                STREET FINDER
            </button>
        </>
    );
};
