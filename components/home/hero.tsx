import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden min-h-[60vw] md:aspect-[16/9] md:min-h-[80vh]">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center">
        <div className="max-w-3xl mx-auto">
          <Link href="/request-project">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
              Start a Custom Project
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}