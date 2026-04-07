"use client";

import CalendarGrid from "./components/CalendarGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">

      {/* CALENDAR CARD */}
      <div className="w-[350px] bg-white shadow-2xl rounded-lg overflow-hidden">

        {/* HANGER */}
        <div className="flex justify-center pt-2">
          <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative h-52">
          <img
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
            className="w-full h-full object-cover"
          />

          {/* DIAGONAL BLUE SHAPE */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-blue-500 clip-path-custom"></div>

          {/* MONTH TEXT */}
          <div className="absolute bottom-6 right-4 text-white text-right">
            <p className="text-sm">2026</p>
            <h1 className="text-xl font-bold">JANUARY</h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex p-4 gap-4">

          {/* NOTES */}
          <div className="w-1/2">
            <h3 className="text-sm font-semibold mb-2">Notes</h3>
            <div className="space-y-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border-b border-gray-300"></div>
                ))}
            </div>
          </div>

          {/* CALENDAR */}
          <div className="w-1/2">
            <CalendarGrid />
          </div>

        </div>

      </div>
    </div>
  );
}