const HeroSection = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center text-center ">

            <div className="absolute inset-0 -top-100 bg-cover bg-center bg-no-repeat about-hero-section " />

            <div className="absolute bottom-0 left-0 w-full h-[100px] 
                  bg-linear-to-t from-white to-transparent" />
            <div className="relative z-10 max-w-3xl px-6">

                <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-gray-900">
                    Meditation, made simple <br />
                    enough for every day.
                </h1>

                <p className="mt-4 text-sm font-semibold">
                    Avyakt Ehsaas helps people build a meditation practice that fits
                    into their actual life. Not a retreat. Not an app you forget about.
                </p>

                <button className="mt-6 px-8 py-3 bg-[#71AC61] text-white rounded-full hover:bg-[#71AC60] transition cursor-pointer">
                    Explore Programs
                </button>

            </div>
        </section>
    );
};

export default HeroSection;