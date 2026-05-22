import React from "react";
import { Bell, Flower2, Users } from "lucide-react";
import LiveSessionPractice from "../../assets/images/LiveSessionPractice.png"

export default function PracticeSection() {
  return (
    <section className="relative bg-white px-6 py-42 overflow-hidden">
      {/* soft grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(#eef3ed_1px,transparent_1px),linear-gradient(90deg,#eef3ed_1px,transparent_1px)] bg-[size:64px_64px] opacity-70" />

      <div className="pointer-events-none absolute -top-[30px] left-0 z-20 h-[120px] w-full bg-gradient-to-b from-transparent via-white/80 to-white" />

      <div className="relative mx-auto grid max-w-[1050px] grid-cols-1 items-center gap-12 lg:grid-cols-[425px_1fr]">
        
        {/* Image Card */}
        <div 
        className="relative h-[470px] overflow-hidden rounded-[28px] shadow-[2_2px_2px_rgba(0,0,0,0.22)]"
        >
          <img
            src={LiveSessionPractice}
            alt="Live meditation session"
            className="h-full w-full object-cover font-dm paragraph-body text-left"
          />

          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8">
            <div className="mb-2 flex items-center gap-2 text-white font-dm uppercase font-med">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              Live Now
            </div>

            <h3 className="max-w-[480px] font-season-medium text-[#C2E0BA] heading-large text-left">
              Join tonight&apos;s session at 9:30 PM IST — your first 21 days
              are free.
            </h3>
          </div> */}
        </div>

        {/* Right Content */}
        <div className="max-w-[520px]">
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            Why Live, Why Guided
          </p>

          <h2 className="font-season-medium text-primary heading-main text-left mb-4">
            Not an app.
            <br />A practice.
          </h2>

          <div className="space-y-4">
            <Feature
              icon={Bell}
              title="Live instructor, every session"
              desc="Presence is felt – not streamed from a recording. Real humans, real time."
            />

            <Feature
              icon={Flower2}
              title="Scientifically designed flow"
              desc="Grounding, attentional training, depth, and integration in every session."
            />

            <Feature
              icon={Users}
              title="Shared stillness goes deeper"
              desc="Group practice creates an accountability anchor that solo sessions lack."
            />
          </div>
        </div>
      </div>


    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-[#EFF8EC]">
        <Icon size={18} strokeWidth={1.8} className="text-[#6EAF63]" />
      </div>

      <div>
        <h3 className="card-title text-primary font-dm font-med text-left">
          {title}
        </h3>
        <p className="max-w-[450px] font-dm body-secondary text-gray">
          {desc}
        </p>
      </div>
    </div>
  );
}