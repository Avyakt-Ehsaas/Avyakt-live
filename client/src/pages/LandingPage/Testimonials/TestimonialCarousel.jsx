import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Testimonial.css';
import invertedComma from '../../../assets/images/invertedComma.png';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

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
  }
];

function TestimonialCarousel() {
  const [activeCard, setActiveCard] = useState(2);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-white min-h-screen py-12 text-[#191919]">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl mb-6">
          Stories from our <span className="text-greenbase">community.</span>
        </h1>
        <p className="font-dm leading-[30px]">
          From students to working professionals, thousands are using small <br />
          daily practices to improve focus and emotional wellbeing.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slidesPerView={5}
        spaceBetween={-40}
        loop={true}
        speed={1000}

        // Mouse + touch support
        simulateTouch={true}
        touchRatio={1.5}
        touchAngle={45}
        resistanceRatio={0.85}
        followFinger={true}
        threshold={5}

        // Bind navigation refs before init
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}

        // Fix navigation after mount
        onInit={(swiper) => {
          swiper.slideToLoop(2, 0);

          setTimeout(() => {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}

        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}

        onSlideChange={(swiper) => setActiveCard(swiper.realIndex)}

        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}

        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 250,
          modifier: 1.6,
          slideShadows: false,
        }}

        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}

        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id}>
            <div
              className={`testimonial-card ${
                activeCard === index
                  ? 'bg-greenbase'
                  : 'bg-[#C2E0BA]/50'
              }`}
            >
              <img
                src={invertedComma}
                alt="quote"
                className="h-16 w-16 opacity-40"
              />

              <p className="testimonial-text">{testimonial.text}</p>

              <p className="testimonial-author">
                — {testimonial.author}
              </p>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Controls */}
        <div className="slider-controler">
          <div ref={prevRef} className="slider-arrow custom-prev">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>

          <div className="swiper-pagination"></div>

          <div ref={nextRef} className="slider-arrow custom-next">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default TestimonialCarousel;