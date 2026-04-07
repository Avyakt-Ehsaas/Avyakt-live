import stressWomen from "../../assets/stress-women.png"
import stressman from "../../assets/stress-man.png"
import runningWomen from "../../assets/running-women.png"
import ProgramRunning from '../../assets/images/ProgramRunning.png'
import './gridPattern.css'

const Problem = () => {
    return (
        <div className="relative px-4 py-10 md:py-20">
        
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0 opacity-50" />
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-0 md:gap-4">

                
                <div className="px-1 md:px-4 md:w-[45%] ">
                    <h1 className="heading-main font-season-medium font-med leading-tight text-primary custom-text" >
                        We learn to train our bodies. Almost nobody <br />
                        <span className="text-[#71AC61]">
                            teaches us to train our minds.
                        </span>
                    </h1>

                    <p className="custom-text paragraph-body max-w-2xl md:px-2 text-primary font-dm mt-4">
                        We spend years learning how to stay physically fit, build careers,
                        and perform under pressure. But when it comes to focus, emotional
                        balance, or handling stress, most of us are left to figure it out
                        on our own.<br /> Meditation is often suggested as the answer. Yet it can
                        feel vague. People try it for a few days, don’t see clear progress,
                        and stop.
                    </p>
                </div>

                <div className="relative min-h-[600px] md:w-[45%]">

                    <div className="absolute top-1/2 right-0 md:left-0 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={ProgramRunning}
                            alt="running"
                        />
                    </div>

                    <div className="absolute  top-12 md:top-0 -left-6 md:left-50 md:right-18 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={stressman}
                            alt="stress man"
                        />
                    </div>

                    <div className="absolute bottom-12 md:bottom-0 -left-6 md:left-50 md:right-18 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
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