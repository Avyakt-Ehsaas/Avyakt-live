const SkeletonLoader = () => {
  return (
    <section className="relative bg-white py-24 px-6 md:px-12 animate-pulse">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>

          {/* Tags */}
          <div className="flex gap-3">
            <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
          </div>

          {/* Weeks */}
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="h-[260px] w-full bg-gray-200 rounded-xl"></div>

          <div className="p-6 rounded-xl bg-gray-100 space-y-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>

            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="h-12 w-full bg-white border rounded-lg"></div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SkeletonLoader;