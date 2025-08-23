import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Brush, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function ArtisanPortfolio({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: artisanData, error: artisanError } = await supabase
    .from("artisan_profiles")
    .select(`
      *,
      profiles!inner(full_name, email)
    `)
    .eq("id", params.id)
    .single()

  if (artisanError || !artisanData) {
    notFound()
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("artisan_id", params.id)

  const artisan = {
    id: params.id,
    name: artisanData.profiles.full_name,
    location: artisanData.location,
    specialization: artisanData.specialization,
    rating: artisanData.rating,
    reviewCount: artisanData.review_count,
    yearsExperience: artisanData.experience_years,
    completedProjects: artisanData.completed_projects,
    bio: artisanData.bio,
    bannerImage: artisanData.banner_image_url || "/indian-textile-workshop.png",
    profileImage: artisanData.profile_image_url || "/indian-artisan-smile.png",
    projects: projects || [],
  }

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
            <Link href="/artists" className="text-foreground hover:text-accent transition-colors">
              Artists
            </Link>
            <Link href="/projects" className="text-foreground hover:text-accent transition-colors">
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

      {/* Banner Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${artisan.bannerImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end space-x-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-card">
              <img
                src={artisan.profileImage || "/placeholder.svg"}
                alt={artisan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white pb-2">
              <h1 className="text-4xl font-bold font-serif mb-2">{artisan.name}</h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>{artisan.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>
                    {artisan.rating} ({artisan.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Info Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold font-serif mb-4 text-card-foreground">About {artisan.name}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{artisan.bio}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {artisan.specialization}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{artisan.yearsExperience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{artisan.completedProjects} completed projects</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-serif mb-6 text-card-foreground">Start a Project</h3>
                  <div className="space-y-4">
                    <Link href="/request-project">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Request Custom Project
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    >
                      Send Message
                    </Button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{artisan.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(artisan.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">Based on {artisan.reviewCount} reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif mb-4 text-foreground">Portfolio</h2>
            <p className="text-lg text-muted-foreground">Explore {artisan.name}'s completed custom projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisan.projects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-serif mb-2 text-card-foreground">{project.title}</h3>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.completion_time}</span>
                    </span>
                    <span className="text-lg font-bold text-primary">{project.price}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
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
