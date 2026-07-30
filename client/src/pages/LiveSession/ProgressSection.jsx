import React from "react";
import { BarChart3, CalendarDays } from "lucide-react";

export default function ProgressSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[460px] max-w-full items-center justify-center bg-[#F8FAF5] px-10 py-16">
        <div className="grid w-full max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            <h2 className="font-season-medium text-primary heading-main text-left">
              Track your Journey
            </h2>

            <p className="font-dm text-gray paragraph-body text-left mb-4">
              True progress is subtle. Our intelligent dashboard quantifies your
              mental resilience and consistency, turning invisible growth into
              tangible milestones.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF8EA] mt-3">
                  <BarChart3 size={18} className="text-[#6FAF63]" />
                </div>
                <div>
                  <h3 className="text-primary font-dm card-title text-left font-med">
                    Resilience Mapping
                  </h3>
                  <p className="text-gray font-dm paragraph-secondary text-left">
                    Real-time emotional and cognitive profiling
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF8EA] mt-3">
                  <CalendarDays size={17} className="text-[#6FAF63]" />
                </div>
                <div>
                  <h3 className="text-primary font-dm card-title text-left font-med">
                    Daily Ritual Tracking
                  </h3>
                  <p className="text-gray font-dm paragraph-secondary text-left">
                    Building momentum through intentional stillness
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="rounded-[16px] bg-white p-6 py-8 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <h3 className="text-primary font-dm paragraph-body text-left  font-med mb-2">
              Measure your jounrney
            </h3>

            <div className="mb-5 grid grid-cols-2 gap-2">
              <div className="rounded-[14px] border border-[#eeeeee] px-4 py-4">
                <p className="text-gray font-dm paragraph-secondary text-left text-gray mb-2">
                  Current Streak
                </p>
                <div className="flex items-end gap-2">
                  <span className="font-season-medium text-greenbase heading-main ">
                    12
                  </span>
                  <span className="text-gray font-dm paragraph-secondary text-left mb-3">Days</span>
                </div>
                <div className="mt-4 h-[3px] rounded-full bg-[#E7E7E7]">
                  <div className="h-full w-[84%] rounded-full bg-[#B7DDB1]" />
                </div>
              </div>

              <div className="rounded-[14px] border border-[#eeeeee] px-4 py-4">
                <p className="mb-2 text-gray font-dm paragraph-secondary text-left">
                  Total Time
                </p>
                <div className="flex items-end gap-2">
                  <span className="font-season-medium text-greenbase heading-main ">
                    4,230
                  </span>
                  <span className="text-gray font-dm paragraph-secondary text-left mb-3">Min</span>
                </div>

                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4].map((dot) => (
                    <span
                      key={dot}
                      className="h-[6px] w-[6px] rounded-full bg-[#A9D4A1]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <ProgressBar title="Emotional Resilience" score="84/100" width="80%" />
            <ProgressBar title="Cognitive Resilience" score="72/100" width="81%" />
          </div>

        </div>
      </div>
    </section>
  );
}

function ProgressBar({ title, score, width }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-dm text-primary font-med body-secondary">{title}</p>
         <p className="text-primary font-dm font-smbold caption-text">{score}</p>
      </div>
      <div className="h-[7px] flex rounded-full bg-[#DADADA]">
        <div
          className="h-full rounded-full bg-[#6EAD64]"
          style={{ width }}
        />
       

      </div>
    </div>
  );
}