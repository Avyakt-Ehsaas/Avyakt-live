import SolutionPageIcon from "../../assets/images/SolutionPageIcon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cardData = [
  {
    title: "Grounded in published research",
    desc: "Programs draw from MBSR research, Rajyoga, Vipassana, and applied neuroscience. Not assembled from wellness trends, designed from studies with measurable outcomes.",
  },
  {
    title: "A live instructor, every session",
    desc: "Not a recording. Not an AI voice. Every session has Sai Amrit, a trained practitioner with 500+ consecutive live sessions, reading the room and adjusting.",
  },
  {
    title: "Progressive, week by week",
    desc: "Week 1 builds stillness. Week 2 trains attention. Week 3 introduces emotion observation. Each session has a specific cognitive target, not a general theme.",
  },
  {
    title: "Measure Before & After progress",
    desc: "Attention, sleep quality, and stress markers assessed at program start and end. You see a number change, not just feel one.",
  },
];

const Solution = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Top Heading */}
        <p className="text-greenbase font-dm text-[14px] md:text-[18px] tracking-widest uppercase mb-4">
          THE SOLUTION
        </p>

        <h1 className="heading-main font-semibold text-primary font-season-regular leading-tight md:leading-[70px]">
          What makes meditation{" "}
          <span className="text-[#71AC61]">actually stick.</span>
        </h1>

        {/* Main Layout */}
       <div className="mt-12 grid grid-cols-1 md:grid-cols-[auto_auto] justify-center items-center gap-16">
          
          {/* LEFT IMAGE */}
          <div className="flex justify-center md:justify-start">
            <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-[#EAF1E7] flex items-center justify-center">
              <img
                src={SolutionPageIcon}
                className="w-1/2 object-contain"
                alt="meditation"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            
            {/* MOBILE SLIDER */}
            <div className="block md:hidden pb-10">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                centeredSlides={true}
                pagination={false}
              >
                {cardData.map((n, index) => (
                  <SwiperSlide key={index}>
                    <Card title={n.title} desc={n.desc} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* DESKTOP GRID */}
         <div className="flex justify-center md:justify-start">
  <div className="hidden md:grid grid-cols-2 gap-8 max-w-[780px] w-full">
              {cardData.map((n, index) => (
                <Card key={index} title={n.title} desc={n.desc} />
              ))}
            </div>
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
    <div className="border border-greenbase rounded-2xl p-4 px-2 text-center bg-white/60 backdrop-blur-sm w-full h-full flex flex-col">
      
      <h3 className="text-greenbase font-dm card-title text-center mb-1">
        {title}
      </h3>

      <p className="text-primary font-dm caption-text text-center px-4">
        {desc}
      </p>

    </div>
  );
};