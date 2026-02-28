import React, { useState } from "react";
import Slider from "react-slick";
import invertedComma from "../../../assets/images/InvertedComma.png";


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
  {
    id: 9,
    text:
      "Changing my daily habits has allowed me to grow and change my life.",
    author: "David, London",
  },
  {
    id: 10,
    text:
      "The mindfulness techniques have been a game-changer for my focus and stress levels.",
    author: "Emily, USA",
  },
];

function TestimonialCarousel() {
  const [activeCard, setActiveCard] = useState(0);

  //circular distance between two indexes in an array of given length
  const getDistance = (index, active, length) => {
    const diff = Math.abs(index - active);
    return Math.min(diff, length - diff);
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  return (
    <div className="bg-white min-h-screen pt-20 text-[#191919]" 
    >
      <div className="mt-10 relative py-12">
   <div className="absolute inset-0 bg-[linear-gradient(to_right,#9ca3af12_1px,transparent_1px),linear-gradient(to_bottom,#9ca3af12_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Heading */}

      <div className="text-center max-w-3xl mx-auto px-4 font-season-medium">
        <h1 className="text-3xl md:text-5xl mb-3">
          Stories from our <span className="text-greenbase">community.</span>
        </h1>
        <p className="font-dm leading-[24px]">
          From students to working professionals, thousands are using small{" "}
          <br />
          daily practices to improve focus and emotional wellbeing.
        </p>
      </div>

      {/* Carousel */}
      <div className="slider-container max-w-7xl mx-auto mt-8 px-4 overflow-hidden">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => {
            const distance = getDistance(
              index,
              activeCard,
              testimonials.length
            );

            const clamped = Math.min(distance, 3);
            const isActive = distance === 0;

            // proportional lift (far = more up)
            const translateY = -clamped * 12;

            //  scale + opacity
            const scale = 1 - clamped * 0.08;
            const opacity = 1 - clamped * 0.25;

            return (
              <div key={testimonial.id} className="px-2">
                <div
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity: opacity,
                  }}
                  className={`
                    transition-all duration-500 rounded-2xl py-6 px-4 h-[260px]
                    flex flex-col justify-between mb-4 mt-4
                    ${isActive
                      ? "bg-[#A7CFA2] shadow-xl z-10"
                      : "bg-[#F3F6F2]"}
                  `}
                >
                  {/* Quote */}
                  <img
                    src={invertedComma}
                    alt=""
                    className={`w-10 ${isActive ? "" : "opacity-40"}`}
                  />

                  {/* Text */}
                  <p
                    className={`
                      font-inter text-sm font-semibold leading-[20px]
                      ${isActive ? "text-primary" : "text-gray-400"}
                    `}
                  >
                    {testimonial.text}
                  </p>

                  {/* Author */}
                  <div className="mt-4">
                    <p
                      className={`text-sm ${
                        isActive
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