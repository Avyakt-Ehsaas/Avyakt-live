import ProblemBrain from "../../assets/images/ProblemBrain.png";

const Pill = ({ text }) => {
  return (
    <div className="bg-[#C2E0BA33] text-greenbase font-dm font-medium px-5 py-3 rounded-full text-sm text-center w-[180px] md:w-[280px] lg:w-[320px] hover:scale-105 transition duration-300">
      {text}
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section className="bg-white pt-28 pb-16 px-4 md:px-10 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center">

        {/* Header */}
        <header className="mb-12">
          <p className="text-greenbase font-season tracking-widest text-sm font-medium mb-1">
            THE PROBLEM
          </p>

          <h1 className="text-3xl md:text-5xl font-season-medium text-primary leading-[45px] md:leading-[60px]">
            Six things happening to your mind right now.
          </h1>

          <p className="mt-4 text-primary font-dm max-w-4xl mx-auto text-[16px] md:text-[18px]">
            Not metaphors. Documented, measurable changes, affecting students,
            working professionals, and <br className="hidden md:block" />
            seniors across India. Most people have no trained response to any of them.
          </p>
        </header>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="flex flex-col items-center gap-6 md:hidden">

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
        <div className="hidden md:grid grid-cols-3 items-center gap-10 mt-10">

          <div className="flex flex-col gap-12 items-end">
            <Pill text="Burnout is not an exception" />
            <Pill text="There is no good place to start" />
            <Pill text="People start meditating and quit" />
          </div>

          <div className="flex justify-center">
            <img
              src={ProblemBrain}
              alt="Brain illustration"
              className="w-72"
            />
          </div>

          <div className="flex flex-col gap-12 items-start">
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