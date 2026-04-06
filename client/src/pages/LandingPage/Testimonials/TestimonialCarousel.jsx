import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import invertedComma from "../../../assets/images/InvertedComma.png";

// IMPORTANT (DON'T MISS)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    text: "Your app brings so much peace and tolerance to our home.",
    author: "Rachael, UK",
  },
  {
    id: 2,
    text: "I came to learn that the storyline in my head was holding me back.",
    author: "Peter, Belgium",
  },
  {
    id: 3,
    text:
      "Headspace provides me with a connection to myself and a disconnection from negative thoughts.",
    author: "Keri, UK",
  },
  {
    id: 4,
    text:
      "Changing my daily habits has allowed me to grow and change my life.",
    author: "David, London",
  },
  {
    id: 5,
    text:
      "The mindfulness techniques have been a game-changer for my focus and stress levels.",
    author: "Emily, USA",
  },
  {
    id: 6,
    text: "Your app brings so much peace and tolerance to our home.",
    author: "Rachael, UK",
  },
  {
    id: 7,
    text: "I came to learn that the storyline in my head was holding me back.",
    author: "Peter, Belgium",
  },
  {
    id: 8,
    text:
      "Headspace provides me with a connection to myself and a disconnection from negative thoughts.",
    author: "Keri, UK",
  },
];

function TestimonialCarousel() {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // detect screen size properly
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    setMounted(true);

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // distance logic
  const getDistance = (index, active, length) => {
    const diff = Math.abs(index - active);
    return Math.min(diff, length - diff);
  };

  // 🔥 dynamic settings (KEY FIX)
  const settings = {
    className: "center",
    infinite: true,
    centerMode: isMobile ? false : true,
    slidesToShow: isMobile ? 1 : window.innerWidth < 1024 ? 3 : 5,
    centerPadding: isMobile ? "40px" : "0px",

    dots: false,
    arrows: false,

    autoplay: true,
    autoplaySpeed: 2500,
    speed: 700,
    cssEase: "ease-in-out",

    pauseOnHover: true,
    pauseOnFocus: true,

    beforeChange: (oldIndex, newIndex) => {
      setActiveCard(newIndex % testimonials.length);
    },
  };

  // prevent wrong initial render
  if (!mounted) return null;

  return (
    <div className="bg-white md:min-h-screen pt-10 sm:pt-20 text-[#191919]">
      <div className="relative py-12">
        {/* grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#9ca3af12_1px,transparent_1px),linear-gradient(to_bottom,#9ca3af12_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto px-4 font-season-medium">
          <h1 className="heading-main mb-3">
            What our community says
          </h1>
          <p className="font-dm text-center paragraph-body leading-[24px]">
           From students to working professionals, thousands are using small daily  practices to improve focus and emotional wellbeing.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-7xl mx-auto mt-8 px-4 overflow-hidden">
          <Slider {...settings} key={isMobile}>
            {testimonials.map((testimonial, index) => {
              const distance = getDistance(
                index,
                activeCard,
                testimonials.length
              );

              const clamped = Math.min(distance, 3);
              const isActive = distance === 0;

              const translateY = -clamped * 12;
              const scale = 1 - clamped * 0.08;
              const opacity = 1 - clamped * 0.25;

              return (
                <div key={testimonial.id} className="px-2">
                  <div
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                    }}
                    className={`
                      transition-all duration-500 rounded-2xl py-6 px-4 h-[260px]
                      flex flex-col justify-between mb-4 mt-4
                      ${isActive
                        ? "bg-[#A7CFA2] shadow-xl z-10"
                        : "bg-[#F3F6F2]"
                      }
                    `}
                  >
                    {/* quote */}
                    <img
                      src={invertedComma}
                      alt=""
                      className={`w-10 ${isActive ? "" : "opacity-40"}`}
                    />

                    {/* text */}
                    <p
                      className={`
                        font-inter parageaph-secondary font-semibold leading-[20px]
                        ${isActive ? "text-primary" : "text-gray-400"}
                      `}
                    >
                      {testimonial.text}
                    </p>

                    {/* author */}
                    <div className="mt-4">
                      <p
                        className={`text-sm ${isActive
                          ? "text-[#1E1E1E] font-semibold"
                          : "text-gray-400"
                          }`}
                      >
                        {testimonial.author}
                      </p>

                      {isActive && (
                        <p className="text-[10px] text-primary font-inter">
                          on what he learned when sitting with himself
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;