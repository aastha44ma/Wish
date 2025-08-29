import { Card, CardContent } from "@/components/ui/card"
import { Brush, MessageCircle, BookOpen, TrendingUp } from "lucide-react"

export default function Features() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4 font-serif">How It Works ?</h3>
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
  )
}