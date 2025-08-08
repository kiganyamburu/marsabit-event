"use client";
import { events } from "@/lib/data/events";
import { galleries } from "@/lib/data/gallery";
import Image from "next/image";
import { useParams } from "next/navigation";


export default function Gallery() {
    const { id } = useParams();
    console.log("Gallery ID:", id);
    const eventsData = events;
    const gallery = galleries.find((g) => g.eventId === id);
    const event = eventsData.find((e) => e.id === id);

    if (!gallery || !event) {
        return <p className="text-center mt-10 text-red-500">Gallery not found.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-black">{event.title} – Gallery</h1>
        <p className="text-gray-600 mb-6">{event.venue}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.images.map((img, index) => (
            <Image
                key={index}
                src={img}
                alt={`${event.title} Image ${index + 1}`}
                    className="w-full h-56 object-cover rounded-lg shadow"
                width={800}
                height={600}
            />
            ))}
        </div>
        </div>
    );
}
