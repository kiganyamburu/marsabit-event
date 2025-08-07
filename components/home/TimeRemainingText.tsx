"use client";
import { formatTimeRemaining } from "@/lib/utils/eventUtils";

interface TimeRemainingTextProps {
  targetDate: Date;
  className?: string;
}

export default function TimeRemainingText({
  targetDate,
  className = "",
}: TimeRemainingTextProps) {
  const timeText = formatTimeRemaining(targetDate);

  return (
    <span className={`text-sm text-gray-600 ${className}`}>{timeText}</span>
  );
}
