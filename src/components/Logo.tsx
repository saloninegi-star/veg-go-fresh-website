import React from "react";

export function VegGoLogo({
  className = "h-14 w-auto",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center select-none cursor-pointer ${className}`}
    >
      <svg
        viewBox="0 0 190 90"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style type="text/css">
            {`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800;900&display=swap');
              
              .logo-text-veggo {
                font-family: 'Poppins', -apple-system, sans-serif;
                font-size: 48px;
                font-weight: 900;
                letter-spacing: -2px;
              }

              .logo-text-fresh {
                font-family: 'Poppins', -apple-system, sans-serif;
                font-size: 11.5px;
                font-weight: 800;
                letter-spacing: 0.28em;
              }
            `}
          </style>
        </defs>

        {/* =========================
            LEAF / SPROUT (Centered at x=98)
        ========================== */}
        <g transform="translate(80, 0)">
          {/* Stem */}
          <path
            d="M17 38 C17 29 15 21 10 13"
            stroke="#16852F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d="M17 38 C18 28 22 20 30 13"
            stroke="#16852F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Left Leaf (Slightly Smaller & Curved) */}
          <path
            d="
              M17 34
              C11 31 5 25 4 16
              C4 11 5 8 6 6
              C14 9 19 15 20 23
              C20 28 19 32 17 34
              Z
            "
            fill="#4BAF3D"
          />

          {/* Left Leaf Vein */}
          <path
            d="M17 32 C13 23 9 16 6 8.5"
            stroke="#E8F5E5"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Right Leaf (Slightly Longer/Taller) */}
          <path
            d="
              M18 34
              C21 24 28 13 41 5
              C42 4 43 4 44 4
              C42 16 38 27 30 32
              C25 34 21 35 18 34
              Z
            "
            fill="#3F9F36"
          />

          {/* Right Leaf Vein */}
          <path
            d="M20 32 C26 23 34 14 41.5 6"
            stroke="#E8F5E5"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* =========================
            VEGGO BRAND NAME 
            (Aligned tightly at x=98)
        ========================== */}
        <text
          x="98"
          y="66"
          className="logo-text-veggo"
          textAnchor="end"
          fill="#16852F"
        >
          Veg
        </text>

        <text
          x="98"
          y="66"
          className="logo-text-veggo"
          textAnchor="start"
          fill="#F46B16"
        >
          Go
        </text>

        {/* =========================
            FRESH - Starts exactly from the Veg/Go junction (x=98)
        ========================== */}
        <text
          x="98"
          y="81"
          className="logo-text-fresh"
          textAnchor="start"
          fill="#16852F"
        >
          FRESH
        </text>
      </svg>
    </div>
  );
}