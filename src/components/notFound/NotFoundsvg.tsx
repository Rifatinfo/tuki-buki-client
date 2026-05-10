const NotFoundsvg = () => {
  return (
    <div>
         {/* Minimal Animated SVG */}
  <div className="relative">

    {/* Soft Glow */}
    <div className="absolute inset-0 bg-orange-200 blur-3xl opacity-40 rounded-full"></div>

    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="relative w-40 h-40"
      fill="none"
    >
      {/* Circle Background */}
      <circle
        cx="100"
        cy="100"
        r="70"
        className="fill-orange-50 dark:fill-neutral-900"
      />

      {/* Search Icon */}
      <g className="animate-[float_3s_ease-in-out_infinite]">
        <circle
          cx="92"
          cy="92"
          r="28"
          stroke="#f97316"
          strokeWidth="8"
        />

        <line
          x1="112"
          y1="112"
          x2="138"
          y2="138"
          stroke="#f97316"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>

      {/* Tiny Dot */}
      <circle
        cx="145"
        cy="58"
        r="6"
        fill="#fb923c"
        className="animate-pulse"
      />
    </svg>
  </div>
    </div>
  )
}

export default NotFoundsvg;