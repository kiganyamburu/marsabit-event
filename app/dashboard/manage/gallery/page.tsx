"use client";
import { useState } from "react";
import { galleries as initialGalleries } from "@/lib/data/gallery";
import { events as eventsData } from "@/lib/data/events";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ManageGalleryPage() {
  const [galleries, setGalleries] = useState(initialGalleries);

  const handleDelete = (eventId: string) => {
    if (confirm("Are you sure you want to delete this gallery?")) {
      setGalleries(galleries.filter((gallery) => gallery.eventId !== eventId));
    }
  };

  const handleEdit = (eventId: string) => {
    alert(`Edit functionality for gallery of event ID: ${eventId} goes here.`);
    // You can open a modal to add/remove images
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Galleries</h1>
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Event</th>
              <th className="p-3 border">Images</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery) => {
              const event = eventsData.find((e) => e.id === gallery.eventId);
              return (
                <tr key={gallery.eventId} className="hover:bg-gray-50">
                  <td className="p-3 border">{event?.title || "Unknown Event"}</td>
                  <td className="p-3 border">
                    <div className="flex space-x-2">
                      {gallery.images.slice(0, 4).map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`Gallery Image ${idx + 1}`}
                          className="w-16 h-16 object-cover rounded border"
                          width={64}
                          height={64}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(gallery.eventId)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 inline-flex items-center"
                    >
                      <Pencil size={16} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(gallery.eventId)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 inline-flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {galleries.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No galleries available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
