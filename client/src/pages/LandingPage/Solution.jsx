import meditation from "../../assets/meditation.png";

const Solution = () => {
    return (
        <section className="py-28 px-4 bg-white">
            <div className="max-w-7xl mx-auto text-center">

                <p className="text-greenbase font-season text-center font-medium tracking-wide">
                    THE SOLUTION
                </p>

                <h1 className="text-3xl md:text-5xl font-semibold text-primary font-season-medium  mt-2">
                    What makes meditation{" "}
                    <span className="text-[#71AC61]">actually stick.</span>
                </h1>

                <p className="text-primary font-dm text-center text-lg mx-auto mt-4">
                    Six design decisions behind every Avyakt program, each one targeting 
                    a specific reason people fail <br/>to build a lasting meditation habit.
                </p>

                <div className="relative mt-8 grid grid-cols-3 items-center h-[80vh]">

                    <div className="flex flex-col justify-between items-end gap-10 h-full">

                        <Card
                            title="Grounded in published research"
                            desc="Programs draw from MBSR research, Rajyoga, Vipassana, and applied neuroscience. Not assembled from wellness trends, designed from studies with measurable outcomes."
                        />

                        <Card
                            title="A live instructor, every session"
                            desc="Not a recording. Not an AI voice. Every session has Sai Amrit, a trained practitioner with 500+ consecutive live sessions, reading the room and adjusting."
                        />
                    </div>

                    <div className="flex justify-center">
                        <div className="w-[350px] h-[350px] rounded-full bg-[#EAF1E7] flex items-center justify-center">
                            <img
                                src={meditation}
                                className="w-2/3 object-contain"
                                alt="meditation"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-10 h-full">

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
        <div className="border border-greenbase rounded-2xl p-6 text-left bg-white/50 backdrop-blur-sm max-w-[350px] h-[200px]">
            <h3 className="text-greenbase font-dm mb-2 text-center">
                {title}
            </h3>
            <p className="text-primary font-dm text-center text-normal">
                {desc}
            </p>
        </div>
    );
};