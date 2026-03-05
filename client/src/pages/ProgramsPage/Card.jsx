import React from "react";

export default function Card({
  badge, // e.g. "8 weeks"
  title, // e.g. "Dhyan Shakti — Attention Lab"
  description, // subtitle
  sectionTitle = "Key Activities",
  list = [], // bullets
  chips = [], // bottom tags
  image, // right/left image url
  imageAlt = "card image",
  imageSide = "right", // "right" | "left"
  className = "",
}) {
  const isRight = imageSide === "right";

  return (
    <div
      className={[
        "w-full rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden",
        "flex flex-col md:flex-row",
        className,
      ].join(" ")}
    >
      {/* IMAGE */}
      <div
        className={[
          "w-full md:w-[38%] min-h-[260px] md:min-h-full relative",
          isRight ? "md:order-2 order-2" : "md:order-1 order-2",
        ].join(" ")}
      >
        {image ? (
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-black/5" />
        )}
      </div>

      {/* CONTENT */}
      <div
        className={[
          "flex-1 p-6 md:p-10",
          isRight ? "md:order-1 order-1" : "md:order-2 order-1",
        ].join(" ")}
      >
        {badge ? (
          <div className="inline-flex items-center rounded-full bg-[#C2E0BA]/20 text-greenbase px-4 py-2 text-sm font-medium">
            {badge}
          </div>
        ) : null}

        {title ? (
          <h3 className="mt-4 text-3xl md:text-4xl font-serif text-black">
            {title}
          </h3>
        ) : null}

        {description ? (
          <p className="mt-3 text-primary text-base md:text-lg leading-relaxed max-w-xl">
            {description}
          </p>
        ) : null}

        {!!list?.length && (
          <>
            <h4 className="mt-3 font-semibold text-black">{sectionTitle}</h4>
            <ul typeof="disc" className="mt-2 space-y-1 text-primary">
              {list.map((item, idx) => (
                <li key={idx} className="flex gap-2 leading-snug">
                  <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-black shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {!!chips?.length && (
          <div className="mt-3 flex flex-wrap gap-3">
            {chips.map((c, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[#71AC61] text-greenbase px-4 py-2 text-sm bg-white"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}