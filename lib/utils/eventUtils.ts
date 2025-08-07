import { Event } from "@/lib/interfaces/event";

/**
 * Get upcoming events (events that haven't started yet)
 */
export function getUpcomingEvents(events: Event[]): Event[] {
  const now = new Date();
  return events.filter((event) => new Date(event.start_date) > now);
}

/**
 * Get ongoing events (events that have started but not ended)
 */
export function getOngoingEvents(events: Event[]): Event[] {
  const now = new Date();
  return events.filter((event) => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    return startDate <= now && endDate >= now;
  });
}

/**
 * Get past events (events that have ended)
 */
export function getPastEvents(events: Event[]): Event[] {
  const now = new Date();
  return events.filter((event) => new Date(event.end_date) < now);
}

/**
 * Get the next upcoming event
 */
export function getNextUpcomingEvent(events: Event[]): Event | null {
  const upcomingEvents = getUpcomingEvents(events);
  if (upcomingEvents.length === 0) return null;

  return upcomingEvents.sort(
    (a, b) =>
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  )[0];
}

/**
 * Check if an event is happening soon (within next 7 days)
 */
export function isEventSoon(event: Event, daysThreshold: number = 7): boolean {
  const now = new Date();
  const eventDate = new Date(event.start_date);
  const timeDifference = eventDate.getTime() - now.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return daysDifference > 0 && daysDifference <= daysThreshold;
}

/**
 * Format time remaining in a human-readable way
 */
export function formatTimeRemaining(targetDate: Date): string {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return "Event has started";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} and ${hours} hour${
      hours !== 1 ? "s" : ""
    }`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
}
