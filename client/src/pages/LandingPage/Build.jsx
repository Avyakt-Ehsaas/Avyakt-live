import img1 from "../../assets/Ellipse 54.png";
import img2 from "../../assets/Ellipse 54 (1).png";
import img3 from "../../assets/Ellipse 54 (2).png";
import img4 from "../../assets/Ellipse 54 (3).png";
import "../AboutUs/gridPattern.css"


const Build = () => {
    const cardData = [
        {
            title: "Start free, join tomorrow morning",
            desc: "Live sessions run every day on Insight Timer. First 21 days are free. No registration process, no app download, no credit card.",
            img: img1
        },
        {
            title: "A year of purposeful progression",
            desc: "12 months, 12 themes, attention, sleep, stress, emotion, silence, and more. Each month builds directly on the one before it.",
            img: img2
        },
        {
            title: "You see the change, not just feel it",
            desc: "Attention and wellbeing assessments before and after every program. Your report shows exactly what shifted.",
            img: img3
        },
        {
            title: "For individuals, schools, and institutions",
            desc: "Individual subscription, school curriculum, corporate workshops, and senior community programs, same rigour, adapted delivery.",
            img: img4
        }
    ];
    return (
        <section className="relative pt-20 sm:pt-40 pb-10 px-4 bg-white min-h-screen flex items-center justify-center">
            <div className=" max-w-7xl mx-auto text-center">
                <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0 opacity-50" />
                <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-0 ">
                    WHAT WE BUILD
                </p>
                <h1 className="heading-main font-semibold text-primary font-season-medium  leading-tight">
                    Live daily sessions. A 12-month structure.<br />Results you can measure.
                </h1>
                <div className="relative grid grid-rows-1 md:grid-cols-4 gap-8 mt-12 ">
                    {cardData.map((data) =>
                        <Card
                            title={data.title}
                            desc={data.desc}
                            img={data.img}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Build;


const Card = ({ title, desc, img }) => {
    return (
        <div className="bg-[#C2E0BA33]  rounded-2xl p-6 text-start ">
            <div className="w-16 h-16 mb-4">
                <img
                    src={img}
                    alt="card"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <h3 className="text-greenbase font-dm card-title mb-4 md:mb-2" >
                {title}
            </h3>
            <p className="font-dm leading-[24px] md:leading-relaxed caption-text text-primary font-medium">
                {desc}
            </p>
        </div>
    );
};