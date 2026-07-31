import React from "react";
import {
  ArrowRight,
  Radio,
  Clock3,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import liveSessionHero from "../../assets/images/LiveSessionheroimage.png";
import { toast } from "react-hot-toast";

const HeroSection = () => {
  const handleClick = () => {
    try {
      const element = document.getElementById("pricing-section");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleHowItsWork = () => {
    try {
      const element = document.getElementById("working-steps");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const trustItems = [
    {
      icon: Radio,
      text: "Live Every Day",
    },
    {
      icon: Clock3,
      text: "15 Minutes",
    },
    {
      icon: ShieldCheck,
      text: "Science-Backed",
    },
    {
      icon: UserRound,
      text: "Beginner Friendly",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f8faf4]">
      {/* Background Image */}
      <img
        src={liveSessionHero}
        alt="Peaceful misty mountain landscape"
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[62%_center]
          sm:object-center
        "
      />

      {/* Desktop Overlay */}
      <div
        className="
          absolute inset-0
          hidden md:block
          bg-[linear-gradient(90deg,rgba(250,250,246,0.98)_0%,rgba(250,250,246,0.96)_27%,rgba(250,250,246,0.82)_45%,rgba(250,250,246,0.18)_68%,rgba(250,250,246,0)_100%)]
        "
      />

     


      {/* Mobile Overlay */}
      <div
        className="
          absolute inset-0
          md:hidden
          bg-[linear-gradient(180deg,rgba(248,250,244,0.15)_0%,rgba(248,250,244,0.35)_26%,rgba(248,250,244,0.92)_54%,rgba(248,250,244,1)_100%)]
        "
      />

      {/* Soft Glow */}
      <div
        className="
          pointer-events-none
          absolute left-[-180px] top-[-120px]
          h-[480px] w-[480px]
          rounded-full
          bg-white/40
          blur-[90px]
        "
      />

      <div
        className="
          relative z-10
          mx-auto flex min-h-screen
          w-full max-w-[1440px]
          items-end md:items-center
          px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24
        "
      >
        <div
          className="
            w-full max-w-[760px]
            pb-10 pt-[340px]
            sm:pt-[420px]
            md:py-20
          "
        >
          {/* Heading */}
          <h1
            className="
              max-w-[900px]
              font-season-medium
              font-medium
              leading-[0.92]
              tracking-[-0.025em]
              heading-main text-left
            "
          >
            Invest 15 minutes.
            <br />
            Transform the
            other 1,425.
          </h1>

          {/* Description */}
          <p
            className="
              mt-3 max-w-[680px]
              font-dm
              leading-4
              text-[#3f4844]
              paragraph-body text-left"
          >
            Every day, join a live guided meditation scientifically designed
            to help you feel calmer, think clearer and build lasting mental
            wellbeing.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-6
              flex flex-col
              gap-4
              sm:flex-row
            "
          >
            <button
              type="button"
              onClick={handleClick}
              className="
                group
                flex w-full
                items-center justify-center
                gap-3
                rounded-full
                bg-[#5f9557]
                px-4 py-4
                font-dm
                text-[15px] font-semibold
                text-white
                shadow-[0_14px_35px_rgba(76,125,66,0.26)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#4c7f45]
                hover:shadow-[0_18px_40px_rgba(76,125,66,0.32)]
                sm:w-auto
                sm:min-w-[320px]
              "
            >
              Start Your Free 24-Day Journey

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={handleHowItsWork}
              className="
                group
                flex w-full
                items-center justify-center
                gap-3
                rounded-full
                border border-[#416b43]
                bg-white/35
                px-4 py-4
                font-dm
                text-[15px] font-semibold
                text-[#315d38]
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-white/65
                sm:w-auto
                sm:min-w-[230px]
              "
            >
              How it Works

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Trust Strip */}
          <div
            className="
              mt-6
              border-t border-[#426248]/20
              pt-7
            "
          >
            <div
              className="
                grid grid-cols-2
                gap-x-4 gap-y-3
                sm:flex
                sm:flex-wrap
                sm:items-center
                sm:gap-y-4
              "
            >
              {trustItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <React.Fragment key={item.text}>
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex h-10 w-10
                          shrink-0
                          items-center justify-center
                          rounded-full
                          bg-[#4f8f45]
                          text-white
                          shadow-sm
                        "
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>

                      <span
                        className="
                          whitespace-nowrap
                          font-dm
                          text-[14px] font-medium
                          text-primary
                          sm:text-sm
                        "
                      >
                        {item.text}
                      </span>
                    </div>

                    {index !== trustItems.length - 1 && (
                      <div
                        className="
                          hidden h-9 w-px
                          bg-[#3f5f47]/20
                          sm:block
                        "
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
       <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none
  bg-[linear-gradient(to_bottom,rgba(250,250,246,0)_0%,rgba(250,250,246,0.25)_35%,rgba(250,250,246,0.75)_70%,rgba(250,250,246,1)_100%)]"
      />
    </section>
  );
};

export default HeroSection;