"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brush, Upload, FileImage, X } from "lucide-react"
import Link from "next/link"

export default function RequestProject() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { ...formData, files: uploadedFiles })
    // In real app, this would send data to API
    alert("Project request submitted successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-serif text-foreground mb-4">Start Your Custom Project</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your vision with our talented artisans and bring your unique ideas to life through traditional
              craftsmanship
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader className="bg-muted/50 border-b border-border">
              <CardTitle className="text-2xl font-serif text-card-foreground">Project Details</CardTitle>
              <p className="text-muted-foreground">
                Tell us about your project so we can match you with the perfect artisan
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Project Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-medium text-card-foreground">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Custom Mandala Wall Art for Living Room"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg py-3 border-border focus:border-primary"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Give your project a descriptive title that captures your vision
                  </p>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-medium text-card-foreground">
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vision in detail. Include style preferences, colors, size requirements, intended use, and any specific cultural or artistic elements you'd like incorporated..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="min-h-[150px] text-base border-border focus:border-primary resize-none"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    The more details you provide, the better we can match you with the right artisan
                  </p>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-lg font-medium text-card-foreground">
                    Budget Range *
                  </Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger className="text-lg py-3 border-border focus:border-primary">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-250">$100 - $250</SelectItem>
                      <SelectItem value="250-500">$250 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500+">$2,500+</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This helps us recommend artisans whose work aligns with your budget
                  </p>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label className="text-lg font-medium text-card-foreground">Reference Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-card-foreground">Upload Reference Images</p>
                        <p className="text-muted-foreground">
                          Share inspiration images, sketches, or examples of what you have in mind
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      >
                        Choose Files
                      </Button>
                    </label>
                  </div>

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-card-foreground">Uploaded Files:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-muted rounded-lg border border-border"
                          >
                            <FileImage className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm text-card-foreground truncate flex-1">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-muted-foreground hover:text-destructive p-1 h-auto"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      By submitting, you agree to our Terms of Service and Privacy Policy
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium"
                      disabled={!formData.title || !formData.description || !formData.budget}
                    >
                      Request a Proposal
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="mt-12 bg-muted/50 border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-serif text-card-foreground mb-6 text-center">
                What Happens Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-foreground">1</span>
                  </div>
                  <h3 className="font-bold text-card-foreground mb-2">Artisan Matching</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll match you with 2-3 artisans whose skills align with your project
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-accent-foreground">2</span>
                  </div>
                  <h3 className="font-bold text-card-foreground mb-2">Receive Proposals</h3>
                  <p className="text-sm text-muted-foreground">
                    Artisans will send you detailed proposals with timelines and pricing
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-foreground">3</span>
                  </div>
                  <h3 className="font-bold text-card-foreground mb-2">Start Creating</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your artisan and begin the co-creation process in our studio
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
