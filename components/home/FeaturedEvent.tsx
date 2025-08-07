"use client";
import { events } from "@/lib/data/events";
import { getNextUpcomingEvent } from "@/lib/utils/eventUtils";
import Image from "next/image";
import Link from "next/link";
import Countdown from "./Countdown";

export default function FeaturedEvent() {
  // Get the next upcoming event
  const nextEvent = getNextUpcomingEvent(events);

  if (!nextEvent) {
    return null; // No upcoming events
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mb-8">
      <div className="bg-gradient-to-r from-primary-blue to-secondary-blue rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <Image
              src={nextEvent.images_url[0]}
              alt={nextEvent.title}
              width={600}
              height={400}
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full">
                FEATURED EVENT
              </span>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                {nextEvent.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {nextEvent.title}
            </h2>

            <p className="text-white/90 mb-4 leading-relaxed">
              {nextEvent.description}
            </p>

            <div className="mb-6">
              <p className="text-sm text-white/80 mb-1">📍 {nextEvent.venue}</p>
              <p className="text-sm text-white/80">
                📅 {new Date(nextEvent.start_date).toLocaleDateString()} -{" "}
                {new Date(nextEvent.end_date).toLocaleDateString()}
              </p>
            </div>

            {/* Countdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
              <h3 className="text-center text-lg font-semibold mb-4">
                ⏰ Event Starts In:
              </h3>
              <Countdown
                targetDate={new Date(nextEvent.start_date)}
                size="medium"
                className="text-white"
              />
            </div>

            <Link
              href={`/events/${nextEvent.id}`}
              className="inline-block bg-accent-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
