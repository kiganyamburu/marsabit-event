import Events from "@/components/home/Events";
import FeaturedEvent from "@/components/home/FeaturedEvent";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Events />
      <FeaturedEvent />
    </main>
  );
}
