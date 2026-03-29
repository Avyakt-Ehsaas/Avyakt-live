import stressWomen from "../../assets/stress-women.png"
import stressman from "../../assets/stress-man.png"
import runningWomen from "../../assets/running-women.png"


const Problem = () => {
    return (
        <div className="relative px-4 py-20">

      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto flex flex-row justify-center items-center gap-4">

                
                <div className="pr-4 pl-4  w-[55%] ">
                    <h1 className="text-4xl md:text-[52px] font-season-medium font-medium leading-tight">
                        We learn to train our bodies. Almost nobody <br />
                        <span className="text-[#71AC61]">
                            teaches us to train our minds.
                        </span>
                    </h1>

                    <p className="text-[18px] max-w-xl px-2 text-primary font-dm font-medium mt-4">
                        We spend years learning how to stay physically fit, build careers,
                        and perform under pressure. But when it comes to focus, emotional
                        balance, or handling stress, most of us are left to figure it out
                        on our own.<br /> Meditation is often suggested as the answer. Yet it can
                        feel vague. People try it for a few days, don’t see clear progress,
                        and stop.
                    </p>
                </div>

                <div className="relative min-h-[600px] w-[45%]">

                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={runningWomen}
                            alt="running"
                        />
                    </div>

                    <div className="absolute top-0 right-18 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={stressman}
                            alt="stress man"
                        />
                    </div>

                    <div className="absolute bottom-0 right-18 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={stressWomen}
                            alt="stress woman"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Problem