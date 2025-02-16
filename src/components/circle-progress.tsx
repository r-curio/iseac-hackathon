interface CircleProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}
const CircleProgress = ({
  progress,
  size = 100,
  strokeWidth = 20,
  className = "",
}: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const innerCircleSize = size * 0.6;

  return (
    <div
      className={`relative inline-flex ${className} overflow-hidden rounded-full`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="z-10 -rotate-90">
        <defs>
          <linearGradient
            id="progressGradient"
            gradientTransform="rotate(0)"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#e5ccf6" />
            <stop offset="32%" stopColor="#CB98ED" />
            <stop offset="100%" stopColor="#591DA9" />
          </linearGradient>
        </defs>
        <circle
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="url(#progressGradient)"
          className="transition-all duration-300 ease-in-out"
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8F7FC]/10 p-2"
        style={{
          width: innerCircleSize,
          height: innerCircleSize,
        }}
      >
        <span className="select-none font-medium">{progress}%</span>
      </div>
    </div>
  );
};

export default CircleProgress;
