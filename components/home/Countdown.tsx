"use client";
import { useState, useEffect } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function Countdown({
  targetDate,
  className = "",
  size = "medium",
}: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <span className="text-accent-red font-semibold">
          Event has started!
        </span>
      </div>
    );
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          container: "text-xs",
          number: "text-sm font-bold",
          label: "text-xs",
          gap: "gap-2",
        };
      case "large":
        return {
          container: "text-lg",
          number: "text-2xl font-bold",
          label: "text-sm",
          gap: "gap-6",
        };
      default: // medium
        return {
          container: "text-sm",
          number: "text-lg font-bold",
          label: "text-xs",
          gap: "gap-4",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div
      className={`flex justify-center ${sizeClasses.gap} ${sizeClasses.container} ${className}`}
    >
      <div className="text-center">
        <div className={`${sizeClasses.number} text-primary-blue`}>
          {timeRemaining.days}
        </div>
        <div
          className={`${sizeClasses.label} text-gray-medium uppercase tracking-wide`}
        >
          {timeRemaining.days === 1 ? "Day" : "Days"}
        </div>
      </div>
      <div className="text-center">
        <div className={`${sizeClasses.number} text-primary-blue`}>
          {timeRemaining.hours.toString().padStart(2, "0")}
        </div>
        <div
          className={`${sizeClasses.label} text-gray-medium uppercase tracking-wide`}
        >
          {timeRemaining.hours === 1 ? "Hour" : "Hours"}
        </div>
      </div>
      <div className="text-center">
        <div className={`${sizeClasses.number} text-primary-blue`}>
          {timeRemaining.minutes.toString().padStart(2, "0")}
        </div>
        <div
          className={`${sizeClasses.label} text-gray-medium uppercase tracking-wide`}
        >
          {timeRemaining.minutes === 1 ? "Min" : "Mins"}
        </div>
      </div>
      <div className="text-center">
        <div className={`${sizeClasses.number} text-primary-blue`}>
          {timeRemaining.seconds.toString().padStart(2, "0")}
        </div>
        <div
          className={`${sizeClasses.label} text-gray-medium uppercase tracking-wide`}
        >
          {timeRemaining.seconds === 1 ? "Sec" : "Secs"}
        </div>
      </div>
    </div>
  );
}
