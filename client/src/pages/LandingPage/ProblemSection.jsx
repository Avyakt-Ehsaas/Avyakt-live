import ProblemBrain from "../../assets/Vector 10.png";

const Pill = ({ text }) => {
  return (
    <div className="bg-[#C2E0BA33] text-greenbase font-dm px-5 py-3 rounded-full  text-center w-[180px] md:w-[420px] hover:scale-102   transition duration-300 card-title  text-center">
      {text}
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section className="bg-white pt-28 px-4 md:px-10 min-h-screen flex items-center justify-center">

      
      <div className="max-w-5xl mx-auto text-center">

        {/* Header */}
        <header >
          <p className="text-greenbase font-dm text-[14px] md:text-[20px] tracking-widest mb-2 uppercase">
            THE PROBLEM
          </p>

          <h1 className="px-12 md:px-0 font-season-medium text-primary heading-main">
            Six things happening to your mind right now.
          </h1>

          <p className="mt-4 text-primary font-dm max-w-5xl mx-auto paragraph-body">
            Not metaphors. Documented, measurable changes, affecting students,
            working professionals, and <br className="hidden md:block" />
            seniors across India. Most people have no trained response to any of them.
          </p>
        </header>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="flex flex-col items-center gap-6 lg:hidden mt-8">

          <Pill text="Reactions happen before thought" />

          <div className="flex gap-3">
            <Pill text="Burnout is not an exception" />
            <Pill text="There is no good place to start" />
          </div>

          <img
            src={ProblemBrain}
            alt="Brain illustration"
            className="w-48 md:my-4"
          />

          <div className="flex gap-3">
            <Pill text="People start meditating and quit" />
            <Pill text="Sleep is broken" />
          </div>

          <Pill text="Attention is Collapsing" />

        </div>

        {/* ================= DESKTOP LAYOUT ================= */}
        <div className="hidden lg:grid grid-cols-3 items-center mt-2">

          <div className="flex flex-col gap-18 items-end">
            <Pill text="Burnout is not an exception" />
            <Pill text="There is no good place to start" />
            <Pill text="People start meditating and quit" />
          </div>

          <div className="flex justify-center">
            <img
              src={ProblemBrain}
              alt="Brain illustration"
              className="w-60"
            />
          </div>

          <div className="flex flex-col gap-18 items-start">
            <Pill text="Sleep is broken" />
            <Pill text="Attention is Collapsing" />
            <Pill text="Reactions happen before thought" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;