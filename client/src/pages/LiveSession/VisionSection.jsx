import React from "react";
import AmritFounder from "../../assets/images/Founder.png";
import VisionMainBg from "../../assets/images/VisionMainBg.png";

const VisionSection = () => {
  const visionPoints = [
    {
      title: "500+",
      subtitle: "Consecutive Live Sessions",
      description: "Facilitating transformation every single day.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-8 w-8"
        >
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M3 19c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" />
          <path d="M15 15c.7-.5 1.6-.8 2.5-.8 2.5 0 4.5 1.8 4.5 4.3" />
        </svg>
      ),
    },
    {
      title: "5+ Years",
      subtitle: "of Consistent Daily Practice",
      description: "Discipline that deepened understanding.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-8 w-8"
        >
          <circle cx="12" cy="5" r="2.2" />
          <path d="M12 7.5v5" />
          <path d="M8.5 11.5 6 16" />
          <path d="M15.5 11.5 18 16" />
          <path d="M4 18c2.5-1.2 5.2-1.6 8-1.6s5.5.4 8 1.6" />
          <path d="M7 20h10" />
        </svg>
      ),
    },
    {
      title: "Research Affiliate",
      subtitle: "Mahindra University",
      description: "Exploring the science of consciousness.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-8 w-8"
        >
          <path d="m3 9 9-5 9 5-9 5-9-5Z" />
          <path d="M7 12.2V17c3.2 2.2 6.8 2.2 10 0v-4.8" />
          <path d="M21 9v6" />
        </svg>
      ),
    },
    {
      title: "MS —",
      subtitle: "AI & Neuroscience",
      description: "Where technology meets the mysteries of the mind.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="h-8 w-8"
        >
          <path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 .3 1.3A3.5 3.5 0 0 0 6 15a3 3 0 0 0 3.5 4.5" />
          <path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1-.3 1.3A3.5 3.5 0 0 1 18 15a3 3 0 0 1-3.5 4.5" />
          <path d="M12 4v16" />
          <path d="M8.5 9.5c1.5 0 2.5.8 3.5 2" />
          <path d="M15.5 9.5c-1.5 0-2.5.8-3.5 2" />
          <path d="M8.5 15c1.5 0 2.5-.7 3.5-1.8" />
          <path d="M15.5 15c-1.5 0-2.5-.7-3.5-1.8" />
        </svg>
      ),
    },
    {
      title: "Gurugram,",
      subtitle: "India",
      description: "Based in India, sharing globally.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-8 w-8"
        >
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
    },
    {
      title: "Purpose-Driven",
      subtitle: "Life",
      description: "Helping individuals and organizations thrive.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-8 w-8"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#fbfcf9] py-20 sm:py-24 lg:py-28">
      {/* Background image */}
      <img
        src={VisionMainBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
      />

      {/* Background fades */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/90" />

      <div className="pointer-events-none absolute left-0 top-0 h-full w-[45%] bg-gradient-to-r from-white/70 to-transparent" />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[45%] bg-gradient-to-l from-white/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-[950px] text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#9eb397]/50 sm:w-20" />

            <div className="flex items-center gap-2">
              <span className="font-dm text-sm font-medium uppercase tracking-[0.18em] text-[#65845d] sm:text-base">
                The Vision
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5 text-[#86a47d]"
              >
                <path d="M12 20c-1-4-4-7-8-8 0 4 3 7 8 8Z" />
                <path d="M12 20c1-4 4-7 8-8 0 4-3 7-8 8Z" />
                <path d="M12 15c-2-3-2-7 0-10 2 3 2 7 0 10Z" />
              </svg>
            </div>

            <span className="h-px w-12 bg-[#9eb397]/50 sm:w-20" />
          </div>

          <h2 className="font-season-medium text-[38px] leading-[1.08] tracking-[-0.02em] text-[#173c2c] sm:text-[48px] lg:text-[62px]">
            A researcher who meditates.
            <br />
            A meditator who researches.
          </h2>

          <div className="mx-auto mt-6 h-px w-32 bg-[#85a17c]" />
        </div>

        {/* Main layout */}
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* Founder image card */}
          <div className="group relative h-[460px] overflow-hidden rounded-[28px] shadow-[0_20px_55px_rgba(43,66,46,0.14)] sm:h-[520px] lg:h-[590px]">
            <img
              src={AmritFounder}
              alt="Amrit, meditation researcher and founder"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#173c2c]/50 via-transparent to-transparent" />

            {/* Image bottom quote */}
            <div className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/10 bg-[#1d3d2f]/80 p-5 text-white shadow-xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/50 sm:h-14 sm:w-14">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-7 w-7"
                  >
                    <path d="M12 20c-1-4-4-7-8-8 0 4 3 7 8 8Z" />
                    <path d="M12 20c1-4 4-7 8-8 0 4-3 7-8 8Z" />
                    <path d="M12 15c-2-3-2-7 0-10 2 3 2 7 0 10Z" />
                  </svg>
                </div>

                <p className="font-dm text-base leading-relaxed text-white/95 sm:text-lg">
                  Meditation, when studied deeply, becomes a bridge between
                  science and self.
                </p>
              </div>
            </div>
          </div>

          {/* Right content card */}
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-3 shadow-[0_20px_55px_rgba(43,66,46,0.12)] backdrop-blur-xl sm:p-6 lg:p-7">
            {/* Introduction */}
            <div className="border-l-2 border-[#78966f] pl-5 sm:pl-7">
              <p className="font-dm text-base leading-[1.4] text-[#343a35] sm:text-lg">
                I came to meditation as a researcher, trained in AI and
                neuroscience, curious about what was actually happening in the
                brain. What I found went beyond the data —
              </p>

              <p className="mt-1 font-dm text-base font-semibold leading-relaxed text-[#5d7c55] sm:text-lg">
                it transformed the way I live, think, and serve.
              </p>
            </div>

            {/* Divider */}
            <div className="my-2 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#dce3d8]" />

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5 text-[#9aaf92]"
              >
                <path d="M12 20c-1-4-4-7-8-8 0 4 3 7 8 8Z" />
                <path d="M12 20c1-4 4-7 8-8 0 4-3 7-8 8Z" />
                <path d="M12 15c-2-3-2-7 0-10 2 3 2 7 0 10Z" />
              </svg>

              <span className="h-px flex-1 bg-[#dce3d8]" />
            </div>

            {/* Vision points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {visionPoints.map((point, index) => {
                const isLeftColumn = index % 2 === 0;
                const isLastRow = index >= visionPoints.length - 2;

                return (
                  <div
                    key={point.title}
                    className={`
    flex gap-3 py-3
    ${!isLastRow ? "border-b border-[#e7ebe4]" : ""}
    ${isLeftColumn ? "sm:border-r sm:pr-4" : "sm:pl-4"}
  `}
                  >
                    <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#f1f4eb] to-[#e7ede1] text-[#64805c] [&>svg]:h-6 [&>svg]:w-6">
                      {point.icon}
                    </div>

                    <div>
                      <h3 className="font-dm text-lg font-semibold leading-tight text-[#171b18]">
                        {point.title}
                      </h3>

                      <p className="mt-0.5 font-dm text-sm font-medium leading-tight text-[#222823] sm:text-[15px]">
                        {point.subtitle}
                      </p>

                      <p className="mt-1 font-dm text-xs leading-relaxed text-[#727772] sm:text-[13px]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mission quote */}
            <div className="mt-2 rounded-[18px] bg-gradient-to-r from-[#edf2e8] to-[#f4f6ef] p-4">
              <div className="flex items-start gap-3">
                <span className="font-season-medium text-5xl leading-[0.8] text-[#75906c]">
                  “
                </span>

                <p className="font-dm text-sm italic leading-relaxed text-[#344238] sm:text-base">
                  My mission is to combine the rigor of research with the depth
                  of meditation to create real, measurable well-being.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;