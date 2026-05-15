"use client";

const services = [
  "Complete Signage",
  "Vehicle Wraps",
  "Airbrushing",
  "Pinstriping",
  "Hand-Painted Signs",
  "Graphic Design",
  "Murals",
  "Shop Fronts",
  "Caravan Graphics",
  "Business Cards",
  "Flags & Banners",
  "3D Lettering",
  "Window Vinyl",
  "Stickers & Graphics",
];

export default function ServicesTicker() {
  const doubled = [...services, ...services];

  return (
    <div className="py-6 border-y border-[#1F1F1F] overflow-hidden bg-[#0D0D0D]">
      <div className="flex">
        <div className="animate-marquee flex shrink-0 items-center gap-0">
          {doubled.map((service, i) => (
            <div key={i} className="flex items-center">
              <span className="font-display text-lg md:text-xl tracking-widest text-white/30 whitespace-nowrap px-8">
                {service.toUpperCase()}
              </span>
              <span className="text-[#FE0101] text-lg">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
