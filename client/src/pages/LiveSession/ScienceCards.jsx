import React from "react";
import {
  Brain,
  Link2,
  Shield,
  Eye,
  Timer,
  Heart,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const scienceCards = [
  {
    icon: Brain,
    title: "Focus & memory",
    desc: "13 minutes daily enhanced sustained attention and working memory after just 8 weeks.",
  },
  {
    icon: Link2,
    title: "Emotional regulation",
    desc: "Meditation reduces amygdala reactivity, the brain's alarm system, making you less triggered.",
  },
  {
    icon: Shield,
    title: "Immune resilience",
    desc: "Personal practice built around your life, your emotions, and your pace.",
  },
  {
    icon: Eye,
    title: "Self-Awareness",
    desc: "Improved meta-consciousness allows you to observe thoughts without being consumed by them.",
  },
  {
    icon: Timer,
    title: "Impulse Control",
    desc: "Consistent practice builds the cognitive ‘gap’ between a stimulus and your response.",
  },
  {
    icon: Heart,
    title: "Gratitude",
    desc: "Rewiring the brain's reward centers to notice and appreciate the present moment more clearly.",
  },
];

export default function ScienceSection() {
  return (
    <section className="relative min-h-fit md:min-h-screen bg-[#C2E0BA33] py-24 lg:pb-36">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            The Science of Sitting Still
          </p>

          <h2 className="px-2 md:px-0 font-season-medium text-primary heading-main">
            What a few minutes a day actually does
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {scienceCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[14px] bg-white px-6 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#C2E0BA33]">
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-[#72B866]"
                  />
                </div>

                <h3 className="text-primary mt-2 font-season-medium card-title text-left font-smbold">
                  {item.title}
                </h3>

                <p className="mt-1 text-gray font-dm paragraph-secondary text-left">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden px-5">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={18}
            slidesPerView={1.2}
            centeredSlides={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            loop={true}
            className="who-swiper !pb-12"
          >
            {scienceCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <SwiperSlide key={index}>
                  <div className="mb-12 rounded-[14px] min-h-[180px] bg-white px-6 py-6 shadow-[0_12px_35px_rgba(0,0,0,0.10)]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#C2E0BA33]">
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#72B866]"
                      />
                    </div>

                    <h3 className="text-primary mt-2 font-season-medium card-title text-left font-smbold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-gray font-dm paragraph-secondary text-left">
                      {item.desc}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[80px] w-full bg-gradient-to-b from-transparent via-white/80 to-white" />

      
      {/* Custom Swiper Dots */}
     <style jsx>{`
  .who-swiper {
    padding-bottom: 42px !important;
  }

  .who-swiper .swiper-pagination {
    bottom: 0px !important;
  }

  .who-swiper .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #c9dec4;
    opacity: 1;
    margin: 0 4px !important;
  }

  .who-swiper .swiper-pagination-bullet-active {
    background: #6bad5f;
  }
`}</style>
    </section>
    
  );
}