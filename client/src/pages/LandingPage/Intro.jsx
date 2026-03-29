import bg from "../../assets/Rectangle 29.png";

const Intro = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 top-10"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "100% 100%",  
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <div className="relative z-10 text-center max-w-5xl px-4">

                <p className="text-greenbase font-season text-center font-medium tracking-wide">
                    INTRODUCING
                </p>

                <h1 className="text-3xl md:text-5xl font-semibold text-primary font-season-medium  mt-2">
                    Avyakt Ehsaas
                </h1>

                <p className="text-primary font-dm text-center text-lg mx-auto mt-4">
                    "The stillness you seek is already within you. We give you the structure to find it."
                </p>

                <div className="mt-16 grid md:grid-cols-3 items-center gap-8">

                    <div>
                        <h2 className="text-greenbase text-2xl"><span className="font-semibold">अव्यक्त</span> · Avyakt</h2>
                        <p className="text-primary font-dm text-center text-md mx-auto mt-4">
                            Beyond words. The silence that holds more than language can carry. The hidden potential within every mind, not something to be created, but something already present, waiting to be uncovered.
                        </p>
                    </div>

                    <div className="text-4xl text-greenbase font-medium">+</div>

                    <div>
                        <h2 className="text-greenbase text-2xl"><span className="font-semibold">अहसास</span> · Ehsaas</h2>
                        <p className="text-primary font-dm text-center text-md mx-auto mt-4">
                            The felt sense of power in stillness. The experience of emerging into your truest self, not through effort or striving, but through awareness and presence.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Intro;