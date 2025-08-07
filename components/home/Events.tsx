"use client";
import { Event } from "@/lib/interfaces/event";
import { useState, useEffect } from "react";
import { events } from "@/lib/data/events";
import { isEventSoon } from "@/lib/utils/eventUtils";
import Image from "next/image";
import Link from "next/link";
import Hero from "./Hero";
import Countdown from "./Countdown";

const today = new Date("2025-07-30");
const futureDate = new Date("2025-08-6");

// Use the imported events data
const eventsData: Event[] = events;

export default function Events() {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [timelineFilter, setTimelineFilter] = useState<string>("All");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);

  useEffect(() => {
    const filteredEvents = () => {
      return eventsData.filter((event) => {
        const start = new Date(event.start_date);
        const end = new Date(event.end_date);

        // Filter by category
        const categoryMatch =
          categoryFilter === "All" || event.category === categoryFilter;

        // Determine timeline
        const isPast = end < today;
        const isCurrent =
          (start <= today && end >= today) || start <= futureDate;
        const isUpcoming = start > futureDate;

        let timelineMatch = true;
        if (timelineFilter === "Past") timelineMatch = isPast;
        if (timelineFilter === "Current") timelineMatch = isCurrent;
        if (timelineFilter === "Upcoming") timelineMatch = isUpcoming;

        return categoryMatch && timelineMatch;
      });
    };
    setFilteredEvents(filteredEvents());
  }, [categoryFilter, timelineFilter]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Events Section */}
      <div id="events-section" className="max-w-6xl mx-auto p-6 bg-gray-light">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-primary-blue">
            Upcoming Cultural Events
          </h2>
          <p className="text-center text-gray-medium text-lg mb-6">
            Discover and participate in Marsabit County&apos;s vibrant cultural
            celebrations
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <select
            className="border-2 border-primary-green p-3 rounded-lg text-primary-blue font-medium focus:ring-2 focus:ring-secondary-green focus:border-secondary-green outline-none [&>option]:text-primary-blue"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ color: "white" }}
          >
            <option value="All">All Categories</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
          </select>

          <select
            className="border-2 border-primary-green p-3 rounded-lg text-primary-blue font-medium focus:ring-2 focus:ring-secondary-green focus:border-secondary-green outline-none [&>option]:text-primary-blue"
            value={timelineFilter}
            onChange={(e) => setTimelineFilter(e.target.value)}
            style={{ color: "white" }}
          >
            <option value="All">All Timelines</option>
            <option value="Past">Past</option>
            <option value="Current">Current</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const isSoon = isEventSoon(event, 7); // Events within 7 days

            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className={`bg-white border-2 rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative ${
                  isSoon
                    ? "border-accent-red hover:border-red-600"
                    : "border-gray-200 hover:border-primary-green"
                }`}
              >
                {/* Urgent indicator for events happening soon */}
                {isSoon && (
                  <div className="absolute -top-2 -right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    Soon!
                  </div>
                )}
                <Image
                  src={event.images_url[0]}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  width={400}
                  height={200}
                />
                <h2 className="text-xl font-bold mt-3 text-primary-blue">
                  {event.title}
                </h2>
                <p className="text-sm text-secondary-green font-medium">
                  📍 {event.venue}
                </p>
                <p className="mt-3 text-gray-dark text-sm leading-relaxed">
                  {event.description}
                </p>
                <p className="mt-4 text-sm text-gray-medium">
                  📅 {new Date(event.start_date).toLocaleDateString()} -{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </p>

                {/* Show countdown for upcoming events */}
                {new Date(event.start_date) > new Date() && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                    <p className="text-xs text-gray-medium mb-2 text-center font-medium">
                      Event starts in:
                    </p>
                    <Countdown
                      targetDate={new Date(event.start_date)}
                      size="small"
                      className="justify-center"
                    />
                  </div>
                )}

                <span
                  className={`inline-block mt-4 text-white text-xs font-bold px-4 py-2 rounded-full ${
                    event.category === "Cultural"
                      ? "bg-primary-green"
                      : event.category === "Sports"
                      ? "bg-secondary-blue"
                      : event.category === "Music"
                      ? "bg-accent-red"
                      : event.category === "Art"
                      ? "bg-primary-blue"
                      : "bg-gray-medium"
                  }`}
                >
                  {event.category}
                </span>
              </Link>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-medium text-lg">
              No events found matching your criteria.
            </p>
            <p className="text-sm text-gray-medium mt-2">
              Try adjusting your filters to see more events.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
