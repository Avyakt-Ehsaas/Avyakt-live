import React from "react";

export default function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="font-semibold text-primary block my-1 font-dm">{label}</label>}
      <input
        {...props}
        className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 text-primary font-dm placeholder:text-[#71AC61] focus:outline-none focus:ring-2 focus:ring-green-400/20"
      />
    </div>
  );
}
