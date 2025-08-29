import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main className="grid">
      <section className="w-full grid border-b border-dashed">
        <Header />
      </section>

      <Hero />
      <Features />

      <Footer />
    </main>
  )
}