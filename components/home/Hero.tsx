"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events-section");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/marsabit-hero.jpg"
          alt="Beautiful landscape of Marsabit County showing Mount Marsabit and surrounding wilderness"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/80 via-primary-blue/60 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to
              <span className="block text-primary-white drop-shadow-lg">
                Marsabit Lake Turkana Cultural Festival
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl">
              Discover the rich heritage and vibrant cultural celebrations of
              Marsabit County. Join us in preserving and celebrating our diverse
              traditions, festivals, and community events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToEvents}
                className="bg-primary-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-green transition-colors duration-300 shadow-lg"
              >
                Explore Events
              </button>
              <Link
                href="/gallery"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-blue transition-all duration-300 text-center"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
