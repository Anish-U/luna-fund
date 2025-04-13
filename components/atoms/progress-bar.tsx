import { FC } from "react";

export interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  const makeSafePercentage = (value: number) => {
    if (value > 100) {
      return 100;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };

  return (
    <div className="relative w-full h-3 bg-white/80 rounded-full">
      <div
        className={`h-3 rounded-full ease-in-out transition-all duration-500 bg-blue-accent`}
        style={{ width: `${makeSafePercentage(percentage)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
