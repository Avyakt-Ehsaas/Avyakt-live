import React from "react";
import "../../index.css";

const stages = [
  {
    title: "Schools",
    description:
      "Programs that help students understand their mind and build attention habits early.",
    image: "/images/schools.jpg",
  },
  {
    title: "Workplaces",
    description:
      "Structured sessions that support focus, stress management, and sustained attention.",
    image: "/images/workplaces.jpg",
  },
  {
    title: "Individuals",
    description:
      "Personal practice for anyone building a consistent meditation habit.",
    image: "/images/individuals.jpg",
  },
  {
    title: "Senior Communities",
    description:
      "Accessible sessions designed for emotional wellbeing and cognitive engagement.",
    image: "/images/seniors.jpg",
  },
];

export default function StagesOfLife() {
  return (
    <section className="stages">
      <h1 className="title">
        Built for different <span>stages of life</span>
      </h1>

      <p className="subtitle">
        Avyakt adapts the same core approach, understanding + daily practice —
        to different environments.
      </p>

      <div className="cards">
        {stages.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}