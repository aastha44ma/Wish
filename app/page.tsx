// This version is also correct and works fine
import Header from "@/components/home/header"
import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import Footer from "@/components/home/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}