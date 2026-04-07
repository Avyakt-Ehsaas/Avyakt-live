import SolutionPageIcon from "../../assets/images/SolutionPageIcon.png"

const Solution = () => {
    return (
        <section className="py-28 px-4 bg-white">
            <div className="max-w-7xl mx-auto text-center">

                <p className="text-greenbase font-dm text-medium md:text-lg tracking-widest  uppercase mb-4 md:mb-0 ">
                    THE SOLUTION
                </p>

                <h1 className="heading-main font-semibold text-primary font-season-medium leading-[70px]">
                    What makes meditation{" "}
                    <span className="text-[#71AC61]">actually stick.</span>
                </h1>

                <div className="relative mt-8 flex flex-col md:flex-row items-center justify-between h-full gap-10 md:h-[80vh]">

                    <div className="flex flex-col justify-between items-end order-2 md:order-1 gap-10 h-full">

                        <Card
                            title="Grounded in published research"
                            desc="Programs draw from MBSR research, Rajyoga, Vipassana, and applied neuroscience. Not assembled from wellness trends, designed from studies with measurable outcomes."
                        />

                        <Card
                            title="A live instructor, every session"
                            desc="Not a recording. Not an AI voice. Every session has Sai Amrit, a trained practitioner with 500+ consecutive live sessions, reading the room and adjusting."
                        />
                    </div>

                    <div className="flex justify-center order-1 md:order-2">
                        <div className="w-[350px] h-[350px] rounded-full bg-[#EAF1E7] flex items-center justify-center">
                            <img
                                src={SolutionPageIcon}
                                className="w-1/2 object-contain"
                                alt="meditation"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between order-3 md:order-3 gap-10 h-full">

                        <Card
                            title="Progressive, week by week"
                            desc="Week 1 builds stillness. Week 2 trains attention. Week 3 introduces emotion observation. Each session has a specific cognitive target, not a general theme."
                        />

                        <Card
                            title="Measure Before & After progress"
                            desc="Attention, sleep quality, and stress markers assessed at program start and end. You see a number change, not just feel one."
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Solution;


const Card = ({ title, desc }) => {
    return (
        <div className="border border-greenbase rounded-2xl py-4 px-6 text-left bg-white/50 backdrop-blur-sm max-w-[369px] h-full lg:h-[200px]">
            <h3 className="text-greenbase font-dm card-title mb-2 text-center">
                {title}
            </h3>
            <p className="text-primary font-dm text-center text-normal">
                {desc}
            </p>
        </div>
    );
};