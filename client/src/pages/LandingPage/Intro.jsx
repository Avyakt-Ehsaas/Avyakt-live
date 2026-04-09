import bg from "../../assets/Rectangle 29.png";

const Intro = () => {
    return (
        <section className="relative w-full sm:h-[130vh] 2xl:min-h-fit flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 top-10 bg-center bg-no-repeat bg-contain md:bg-cover"
                style={{
                    backgroundImage: `url(${bg})`,
                }}
            />

            <div className="relative z-10 text-center max-w-5xl px-4">

                <p className="text-greenbase font-season text-center font-medium tracking-widest text-[14px] text-[20px] uppercase ">
                    INTRODUCING
                </p>

                <h1 className="heading-main font-semibold text-primary font-season-medium  mt-2">
                    Avyakt Ehsaas
                </h1>

                <p className="text-primary font-dm text-center paragraph-body mx-auto mt-4 font-medium">
                    "The stillness you seek is already within you. We give you the structure to find it."
                </p>

                <div className="mt-10 grid md:grid-cols-3 gap-8">

                    <div>
                        <h2 className="text-greenbase text-3xl font-season-regular"><span className=" font-medium">अव्यक्त</span> · Avyakt</h2>
                        <p className="text-primary paragraph-body font-dm text-center font-med mx-auto mt-4 ">
                            Beyond words. The silence that holds more than language can carry. The hidden potential within every mind, not something to be created, but something already present, waiting to be uncovered.
                        </p>
                    </div>

                    <div className="text-5xl text-greenbase font-medium md:mt-16">+</div>

                    <div>
                        <h2 className="text-greenbase text-3xl font-season-regular"><span className="font-med">अहसास</span> · Ehsaas</h2>
                        <p className="text-primary paragraph-body font-med font-dm text-center text-md mx-auto mt-4">
                            The felt sense of power in stillness. The experience of emerging into your truest self, not through effort or striving, but through awareness and presence.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Intro;