const HeroSection = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center text-center">

            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat about-hero-section bottom-0" />

            {/*  Soft White Mask  */}
        <div className="absolute inset-x-0 top-0 h-[90%] md:h-[75%] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

            {/* Bottom Smooth Fade */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl px-6">
                <h1 className="text-5xl  md:text-6xl font-season-medium font-semibold  leading-[50px] md:leading-tight text-primary">
                    Meditation, made simple 
                    enough for every day.
                </h1>

                <p className="mt-4 text-base md:text-[20px] font-dm font-medium text-primary ">
                    Avyakt Ehsaas helps people build a meditation practice that fits
                    into their actual life. Not a retreat. Not an app you forget about.
                </p>

                <button className="mt-6 px-8 py-3 bg-[#71AC61] text-white rounded-full hover:scale-102 transition font-dm font-medium cursor-pointer">
                    Explore Programs
                </button>
            </div>
        </section>
    );
};

export default HeroSection;