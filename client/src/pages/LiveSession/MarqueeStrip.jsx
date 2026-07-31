import React from "react";

const items = [
  "Live Every Day",
  "15 Minutes",
  "Science-Backed",
  "Beginner Friendly",
  "Daily Practice",
  "Inner Calm",
  "Better Focus",
  "Live Guided Sessions",
  "Better Sleep",
  "Transform Daily",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-[#19301e] py-[14px]">
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span className="font-dm text-[11px] uppercase tracking-[0.26em] text-white/65 select-none">
              {item}
            </span>
            <span className="text-[#71AC61] text-[8px] select-none">◆</span>
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 50s linear infinite;
          will-change: transform;
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
