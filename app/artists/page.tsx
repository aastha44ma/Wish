import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Brush } from "lucide-react"
import Link from "next/link"

export default function ArtistsPage() {
  const artists = [
    {
      id: "priya-sharma",
      name: "Priya Sharma",
      location: "Jaipur, Rajasthan",
      specialization: "Traditional Block Printing & Textiles",
      rating: 4.9,
      reviewCount: 127,
      profileImage: "/indian-artisan-smile.png",
      completedProjects: 89,
      startingPrice: "$50",
    },
    {
      id: "arjun-patel",
      name: "Arjun Patel",
      location: "Ahmedabad, Gujarat",
      specialization: "Wooden Handicrafts & Carvings",
      rating: 4.8,
      reviewCount: 94,
      profileImage: "/placeholder.svg",
      completedProjects: 67,
      startingPrice: "$75",
    },
    {
      id: "meera-singh",
      name: "Meera Singh",
      location: "Varanasi, Uttar Pradesh",
      specialization: "Silk Weaving & Embroidery",
      rating: 4.9,
      reviewCount: 156,
      profileImage: "/placeholder.svg",
      completedProjects: 112,
      startingPrice: "$60",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Brush className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-serif">KalaDwar</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/artists" className="text-accent font-medium">
              Artists
            </Link>
            <Link href="/request-project" className="text-foreground hover:text-accent transition-colors">
              Projects
            </Link>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Login/Sign Up
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-serif text-foreground mb-4">Our Master Artisans</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with skilled craftspeople who bring generations of traditional knowledge to your custom projects
            </p>
          </div>

          {/* Artists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Card key={artist.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={artist.profileImage || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-serif mb-1 text-card-foreground">{artist.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{artist.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{artist.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">({artist.reviewCount} reviews)</p>
                    </div>
                  </div>

                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
                    {artist.specialization}
                  </Badge>

                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
                    <span>{artist.completedProjects} projects completed</span>
                    <span className="font-bold text-primary">From {artist.startingPrice}</span>
                  </div>

                  <Link href={`/artisan/${artist.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <p className="text-sm">© 2024 KalaDwar. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact Us
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
