import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brush, MessageCircle, BookOpen, TrendingUp, Facebook, Twitter, Instagram, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function KalaDwarHomepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Brush className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-serif">KalaDwar</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-foreground hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/artists" className="text-foreground hover:text-accent transition-colors">
              Our Artists
            </Link>
            <Link href="/request-project" className="text-foreground hover:text-accent transition-colors">
              Custom Projects
            </Link>
            {/* Dropdown menu for login/signup options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex items-center gap-2"
                >
                  Login/Sign Up
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/buyer/login" className="w-full cursor-pointer">
                    Login as Buyer
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/buyer/signup" className="w-full cursor-pointer">
                    Sign Up as Buyer
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/artisan/login" className="w-full cursor-pointer">
                    Login as Artisan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/artisan/signup" className="w-full cursor-pointer">
                    Join as Artisan
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white flex flex-col items-center">
          {/* Hero content only, no foreground image */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Co-create Your <span className="text-accent">Masterpiece</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              From your imagination to a one-of-a-kind creation, powered by AI
            </p>
            <Link href="/request-project">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                Start a Custom Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4 font-serif">How It Works</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of traditional craftsmanship and modern technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brush className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-4 font-serif">AI Co-creation</h4>
                <p className="text-muted-foreground">
                  Collaborate with our AI to generate design mockups and concepts that blend your vision with
                  traditional artistry.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-4 font-serif">Direct Collaboration</h4>
                <p className="text-muted-foreground">
                  Work directly with skilled artisans through our secure chat and milestone-based project system.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-4 font-serif">Digital Storytelling</h4>
                <p className="text-muted-foreground">
                  We automatically generate the unique story behind your art for you to share and treasure forever.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h4 className="text-xl font-bold text-card-foreground mb-4 font-serif">AI Business Insights</h4>
                <p className="text-muted-foreground">
                  Get data-driven tips and insights to help you grow your art business and reach more customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <p className="text-sm">© 2024 KalaDwar. All rights reserved.</p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              </div>
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
