import React from "react";
import { Star, Play } from "lucide-react";
import Library1 from "../../assets/images/Library1.png"

const categories = [
  "All Libraries",
  "Meditation Basics",
  "Hard Feelings",
  "Body & Rest",
  "Focus & Productivity",
  "Growth & Relationships",
];

const sessions = [
  {
    image: "/images/breakups.jpg",
    rating: "4.9",
    meta: "10 mins",
    category: "HARD FEELINGS · Grief & Major Life Events",
    title: "Breakups",
    tags: ["Heartbreak", "Emotional healing"],
  },
  {
    image: "/images/night-wakeups.jpg",
    rating: "4.9",
    meta: "10 mins",
    category: "BODY & REST · Sleep",
    title: "Night Wake-ups",
    tags: ["Waking at night", "3am anxiety"],
  },
  {
    image: "/images/anger-management.jpg",
    rating: "4.9",
    meta: "10 mins",
    category: "HARD FEELINGS · Emotional Regulation",
    title: "Anger Management",
    tags: ["Anger control"],
  },
  {
    image: "/images/burnout.jpg",
    rating: "4.9",
    meta: "6 mins",
    category: "HARD FEELINGS · Stress & Burnout",
    title: "Burnout",
    tags: ["Recovery", "Energy management"],
  },
  {
    image: "/images/cool-the-furnace.jpg",
    rating: "4.9",
    meta: "Release · 10 mins",
    category: "LIFE EVENTS · ANGER",
    title: "Cool the Furnace",
    tags: ["All Levels"],
  },
  {
    image: "/images/falling-asleep.jpg",
    rating: "4.9",
    meta: "12 mins",
    category: "BODY & REST · Sleep",
    title: "Falling Asleep",
    tags: ["Sleep onset", "Insomnia"],
  },
];

export default function LibrarySection() {
  return (
    <section className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-greenbase font-dm text-medium text-[14px] md:text-[20px] tracking-widest uppercase mb-6 md:mb-0 ">
            Our Library
          </p>

          <h2 className="px-12 md:px-0 heading-main font-semibold text-primary font-season-med">
            Every session, every context
          </h2>

          <p className="max-w-4xl mx-auto mt-2 text-gray font-dm paragraph-body text-center">
            Browse all sessions across every category. Filter by what fits your
            moment right now.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((item, index) => (
            <button
              key={item}
              className={`rounded-full px-5 py-3 card-title font-dm transition-all ${
                index === 0
                  ? "bg-[#eff8ec] text-[#69a85c]"
                  : "text-[#111] hover:bg-[#eff8ec] hover:text-[#69a85c]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div
              key={session.title}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={Library1}
                  alt={session.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-gray-700 mb-2">
                  <span className="paragraph-secondary text-primary font-dm">{session.rating}</span>
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="paragraph-secondary text-primary font-dm">· {session.meta}</span>
                </div>

                <p className="caption-text text-greenbase font-dm font-semibold mb-1 uppercase 
                truncate whitespace-nowrap overflow-hidden">
                  {session.category}
                </p>

                <h3 className="text-primary font-dm card-title font-med mb-3">
                  {session.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag) => (
                      <span
                        key={tag}
                        className="paragraph-secondary font-dm text-greenbase bg-[#C2E0BA33] px-3 py-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="min-w-8 h-8 rounded-full bg-[#6cab5f] flex items-center justify-center hover:bg-[#4f8f44] transition">
                    <Play size={14} className="text-white fill-white ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-6">
          <button className="w-72 mt-3 p-4 bg-[#71AC61] hover:bg-[#4F7944] text-white rounded-full transition-all duration-300 font-dm font-med paragraph-secondary">
            Explore all 242 sessions
          </button>
        </div>
      </div>
    </section>
  );
}