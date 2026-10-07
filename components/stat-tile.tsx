"use client";

import { useState } from "react";

type StatTileProps = {
  value: string;
  label: string;
  detail: string;
};

// A stat that reveals its details on hover (mouse) or tap (touch / keyboard).
export function StatTile({ value, label, detail }: StatTileProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={`${value} ${label}. ${detail}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(false);
      }}
      onClick={(e) => {
        // Mouse users already get the hover reveal; taps and keyboard toggle it.
        if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
        setOpen((o) => !o);
      }}
      onBlur={() => setOpen(false)}
      className="group relative min-h-[116px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 p-5 text-left backdrop-blur-sm transition-colors hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
    >
      <span
        aria-hidden
        className={`absolute right-4 top-3 text-base text-slate-500 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
      >
        +
      </span>

      <div className={`transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}>
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-100">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{label}</p>
      </div>

      <p
        className={`absolute inset-0 flex items-center p-5 pr-10 text-sm leading-snug text-slate-200 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {detail}
      </p>
    </button>
  );
}