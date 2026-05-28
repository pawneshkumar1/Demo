const GrowthLogo = ({ size = 120, color = "black" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bars */}
      <rect x="10" y="60" width="10" height="20" fill={color} rx="2" />
      <rect x="30" y="50" width="10" height="30" fill={color} rx="2" />
      <rect x="50" y="40" width="10" height="40" fill={color} rx="2" />
      <rect x="70" y="30" width="10" height="50" fill={color} rx="2" />

      {/* Base line */}
      <line
        x1="5"
        y1="80"
        x2="95"
        y2="80"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Arrow curve */}
      <path
        d="M10 55 C30 55, 50 35, 75 20"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Arrow head */}
      <polygon points="75,20 68,18 72,26" fill={color} />
    </svg>
  );
};

export default GrowthLogo;
