const stats = [
  {
    value: "13 min",
    text: "daily improves focus & memory",
  },
  {
    value: "20 %",
    text: "fewer stress systems",
  },
  {
    value: "10 min",
    text: "Successful clinical trials",
  },
  {
    value: "5y+",
    text: "Consistent daily practice",
  },
];

export default function StatsBar() {
  return (
    <section className="w-full bg-greenbase-primary py-9 px-4">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 text-center text-white">
        {stats.map((item, index) => (
          <div key={index}>
            <h3 className="font-season heading-main">
              {item.value}
            </h3>

            <p className="font-dm paragraph-body mt-2">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}