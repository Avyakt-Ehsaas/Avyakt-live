import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import invertedComma from "../../../assets/images/InvertedComma.png";

// IMPORTANT (DON'T MISS)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    text:
      "The short evening sessions helped me slow down after long workdays. I now sleep more peacefully and wake up feeling less overwhelmed.",
    author: "Ananya Sharma",
    location: "Bengaluru, India",
    role: "Product Designer",
  },
  {
    id: 2,
    text:
      "I started using the focus practices during exam preparation. Within a few weeks, I was able to study longer without constantly checking my phone.",
    author: "Rohan Mehta",
    location: "Delhi, India",
    role: "University Student",
  },
  {
    id: 3,
    text:
      "The guided sessions gave me a simple way to manage stress between meetings. I feel more patient, focused, and less reactive at work.",
    author: "Michael Carter",
    location: "Austin, USA",
    role: "Software Engineer",
  },
  {
    id: 4,
    text:
      "Meditation always felt difficult to me, but these sessions were easy to follow. The daily routine has made a noticeable difference in my anxiety.",
    author: "Priya Nair",
    location: "Pune, India",
    role: "HR Professional",
  },
  {
    id: 5,
    text:
      "The sleep meditations became part of my nightly routine. I no longer spend an hour replaying the entire day before falling asleep.",
    author: "Emily Johnson",
    location: "Seattle, USA",
    role: "Marketing Manager",
  },
  {
    id: 6,
    text:
      "As a parent, I wanted to respond more calmly instead of reacting immediately. The mindfulness exercises have helped me create that pause.",
    author: "Neha Kapoor",
    location: "Mumbai, India",
    role: "Parent and Educator",
  },
  {
    id: 7,
    text:
      "The progress tracking kept me consistent. Seeing how my mood changed before and after each session made the benefits feel real and measurable.",
    author: "Daniel Brooks",
    location: "Chicago, USA",
    role: "Financial Analyst",
  },
  {
    id: 8,
    text:
      "I began with five-minute sessions during lunch breaks. Over time, I noticed better concentration, fewer anxious thoughts, and more emotional balance.",
    author: "Arjun Verma",
    location: "Dehradun, India",
    role: "Software Developer",
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
    <div className="bg-white md:min-h-screen 2xl:min-h-fit pt-4 sm:pt-20 text-[#191919]">
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
<<<<<<< HEAD
                        font-inter text-sm font-semibold leading-[20px]
=======
                        font-inter parageaph-secondary font-semibold leading-[20px]
>>>>>>> 5d76c3ef4ea4c3a38ebea07aad406aafe8cd1d84
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