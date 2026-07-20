const stats = [
  {
    value: "47%",
    text: "of minds are wandering right now",
  },
  {
    value: "8 wks",
    text: "to measurable grey matter change",
  },
  {
    value: "10 min",
    text: "daily minimum for real effect",
  },
  {
    value: "83%",
    text: "of users sleep better in week one",
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