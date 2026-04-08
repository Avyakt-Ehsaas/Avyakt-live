import SolutionPageIcon from "../../assets/images/SolutionPageIcon.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const cardData = [{
    title: 'Grounded in published research',
    desc: "Programs draw from MBSR research, Rajyoga, Vipassana, and applied neuroscience. Not assembled from wellness trends, designed from studies with measurable outcomes."
}, {
    title: "A live instructor, every session",
    desc: "Not a recording. Not an AI voice. Every session has Sai Amrit, a trained practitioner with 500+ consecutive live sessions, reading the room and adjusting."
}, {
    title: "Progressive, week by week",
    desc: "Week 1 builds stillness. Week 2 trains attention. Week 3 introduces emotion observation. Each session has a specific cognitive target, not a general theme."
}, {
    title: "Measure Before & After progress",
    desc: "Attention, sleep quality, and stress markers assessed at program start and end. You see a number change, not just feel one."
}]

const Solution = () => {
    return (
        <section className="py-28 px-4 bg-white">
            <div className="max-w-7xl mx-auto text-center">

                <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest  uppercase mb-4 md:mb-0 ">
                    THE SOLUTION
                </p>

                <h1 className="heading-main font-semibold text-primary font-season-regular leading-[70px]">
                    What makes meditation{" "}
                    <span className="text-[#71AC61]">actually stick.</span>
                </h1>

                <div className="relative mt-8 grid grid-cols-1 md:grid-cols-[4fr_6fr] items-center justify-between h-full gap-10 md:h-[80vh]">
                    
                    <div className="flex justify-center md:justify-end">
                        <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-[#EAF1E7] flex items-center justify-center">
                            <img src={SolutionPageIcon} className="w-1/2 object-contain" alt="meditation" />
                        </div>
                    </div>

                    <div className="h-full">
                        <div className="block md:hidden pb-12">
                            <Swiper
                                modules={[Pagination,Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={true} 
                                onh
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false, 
                                    pauseOnMouseEnter:true
                                }}
                                centeredSlides={true}
                                pagination={false}
                                className="mySwiper"
                            >
                                {cardData.map((n, index) => (
                                    <SwiperSlide key={index}>
                                        <Card title={n.title} desc={n.desc} isSlider={true} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="hidden md:grid grid-cols-2 gap-10 h-full">
                            {cardData.map((n, index) => (
                                <Card key={index} title={n.title} desc={n.desc} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Solution;


const Card = ({ title, desc }) => {
    return (
        <div className="border border-greenbase rounded-2xl py-4 px-4 md:px-6 text-left bg-white/50 backdrop-blur-sm max-w-full md:max-w-[369px] h-full min-h-[180px] lg:h-[250px]">
            <h3 className="text-greenbase font-dm card-title mb-2 text-center">
                {title}
            </h3>
            <p className="text-primary font-dm text-center text-normal">
                {desc}
            </p>
        </div>
    );
};