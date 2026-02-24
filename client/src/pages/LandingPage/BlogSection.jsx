import React from "react";

import kidImg from "../../assets/images/schoolblog2.png";
import youthImg from "../../assets/images/organisationblog2.png";
import calmImg from "../../assets/images/individualblog2.png";
import bgImg from "../../assets/images/blog_background_image.png";

function BlogSection() {
  const blogs = [
    {
      tag: "Kids & Mindfulness",
      title: "Helping Children Handle Big Emotions",
      desc: "Simple breathing and awareness practices that support calm, focus, and emotional balance in everyday moments.",
      image: kidImg,
    },
    {
      tag: "Youth & Mental Clarity",
      title: "Why Your Mind Never Seems to Rest",
      desc: "Understanding overthinking, digital overload, and how mindfulness creates mental space.",
      image: youthImg,
    },
    {
      tag: "Everyday Calm",
      title: "Finding Stillness in a Busy Life",
      desc: "Small meditation habits that ease stress and bring presence back into daily routines.",
      image: calmImg,
    },
  ];

  return (
    <section
      className="relative w-full min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(246, 249, 245, 0.8) 0%, rgba(250, 245, 245, 0.1) 90%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-8 sm:px-6 flex flex-col justify-between h-full py-1">
        
        {/* Heading */}
        <div>
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-medium text-[#191919] leading-tight">
            Stories & science of{" "}
            <span className="text-greenbase">calm living</span>
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Short reads on mindfulness, emotional wellbeing, and modern life for every age.
          </p>
        </div>

        {/* TOP ROW */}
        <div className="flex mt-4 flex-col items-center gap-4 md:flex-row md:justify-center">
          {blogs.slice(0, 2).map((blog, index) => (
            <div
              key={index}
             className="flex w-[320px] max-w-[380px] overflow-hidden rounded-xl bg-white shadow-sm"
            >
              {/* Content */}
              <div className="flex flex-col justify-center py-0 px-3 pr-4 flex-1">
                <p className="text-xs font-dm font-medium text-greenbase">
                  {blog.tag}
                </p>

                <h3 className="mt-1 font-dm text-medium font-semibold text-primary">
                  {blog.title}
                </h3>

                <p className="mt-1 text-xs text-[#696969] line-clamp-3">
                  {blog.desc}
                </p>
              </div>

              {/* Image */}
              <div className="w-28 h-full">
                <img
                  src={blog.image}
                  alt="blog"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CARD */}
        <div className="flex justify-center mt-2">
          <div className="flex w-[320px] max-w-[380px] overflow-hidden rounded-xl bg-white shadow-sm">
            
            {/* Content */}
            <div className="flex flex-col justify-center py-0 px-3 pr-4 flex-1">
              <p className="text-xs font-dm font-medium text-greenbase">
                {blogs[2].tag}
              </p>

              <h3 className="mt-1 font-dm text-medium font-semibold text-primary">
                {blogs[2].title}
              </h3>

              <p className="mt-1 text-xs font-dm text-[#696969] line-clamp-3">
                {blogs[2].desc}
              </p>
            </div>

            {/* Image */}
            <div className="w-28 h-full">
              <img
                src={blogs[2].image}
                alt="blog"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <button className="rounded-full font-dm bg-greenbase-primary px-5 py-2 text-xs text-white transition hover:scale-105">
            See more
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;