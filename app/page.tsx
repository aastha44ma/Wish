import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}