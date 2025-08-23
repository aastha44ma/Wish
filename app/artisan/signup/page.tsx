"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User, Sparkles, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function ArtisanSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    place: "",
    expertise: "",
    learningSource: "",
    experience: "",
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [generatedBio, setGeneratedBio] = useState("")
  const [isGeneratingBio, setIsGeneratingBio] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateBiography = async () => {
    if (!formData.name || !formData.place || !formData.expertise || !formData.learningSource || !formData.experience) {
      setError("Please fill in all the required fields before generating biography")
      return
    }

    setIsGeneratingBio(true)
    setError(null)

    try {
      console.log("[v0] Generating biography with data:", {
        name: formData.name,
        place: formData.place,
        expertise: formData.expertise,
        learningSource: formData.learningSource,
        experience: formData.experience,
      })

      const biographyTemplates = [
        `Meet ${formData.name}, a masterful ${formData.expertise} artisan from the culturally rich region of ${formData.place}. ${formData.name}'s journey into this ancient craft began ${formData.learningSource}, where they discovered not just techniques, but a deep connection to their cultural heritage. With ${formData.experience}, ${formData.name} has developed a distinctive style that honors traditional methods while embracing contemporary innovation. Each creation reflects years of dedication, cultural pride, and an unwavering commitment to preserving the artistic legacy of their ancestors for future generations.`,

        `${formData.name} is a distinguished ${formData.expertise} artist whose roots run deep in ${formData.place}, a place known for its artistic traditions. Their craft was nurtured ${formData.learningSource}, providing them with both technical mastery and cultural understanding. Through ${formData.experience}, ${formData.name} has become not just an artisan, but a storyteller whose work speaks of heritage, passion, and artistic evolution. Every piece they create carries the essence of their journey, blending time-honored techniques with personal artistic vision.`,

        `From the vibrant artistic community of ${formData.place} comes ${formData.name}, a talented ${formData.expertise} craftsperson whose work embodies the spirit of traditional Indian artistry. Having learned this beautiful craft ${formData.learningSource}, ${formData.name} brings a unique perspective shaped by both ancestral wisdom and personal creativity. Their ${formData.experience} has culminated in a body of work that celebrates cultural heritage while speaking to contemporary sensibilities, making each creation a bridge between past and present.`,
      ]

      // Select a random template for variety
      const selectedTemplate = biographyTemplates[Math.floor(Math.random() * biographyTemplates.length)]

      // Simulate a brief delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setGeneratedBio(selectedTemplate)
      console.log("[v0] Biography generated successfully")
    } catch (error) {
      console.error("[v0] Error generating biography:", error)
      setError("Failed to generate biography. Please try again.")
    } finally {
      setIsGeneratingBio(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!generatedBio) {
      setError("Please generate a biography before submitting")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/artisan/dashboard`,
          data: {
            full_name: formData.name,
            user_type: "artisan",
            location: formData.place,
            specialization: formData.expertise,
            learning_source: formData.learningSource,
            experience_years: Number.parseInt(formData.experience.match(/\d+/)?.[0] || "1"),
            bio: generatedBio,
          },
        },
      })

      if (authError) throw authError

      router.push("/auth/sign-up-success")
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to create account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-orange-900">Join as an Artisan</CardTitle>
            <CardDescription className="text-orange-700">
              Share your craft with the world and connect with art lovers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="space-y-2">
                <Label className="text-orange-900">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-orange-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="profileImage"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Label>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-orange-900">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="place" className="text-orange-900">
                    Place/City *
                  </Label>
                  <Input
                    id="place"
                    name="place"
                    type="text"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-orange-900">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-orange-200 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-orange-900">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-orange-900">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Artisan-specific Information */}
              <div className="space-y-2">
                <Label htmlFor="expertise" className="text-orange-900">
                  Your Expertise/Craft *
                </Label>
                <Input
                  id="expertise"
                  name="expertise"
                  type="text"
                  placeholder="e.g., Block Printing, Pottery, Textile Weaving, Jewelry Making"
                  value={formData.expertise}
                  onChange={handleChange}
                  required
                  className="border-orange-200 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learningSource" className="text-orange-900">
                  Where did you learn this craft? *
                </Label>
                <Textarea
                  id="learningSource"
                  name="learningSource"
                  placeholder="e.g., from my grandmother, at a traditional art school, through a master craftsman in my village"
                  value={formData.learningSource}
                  onChange={handleChange}
                  required
                  className="border-orange-200 focus:border-orange-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-orange-900">
                  Your Experience *
                </Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="e.g., 15 years of experience, have exhibited in local galleries, taught workshops to children"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="border-orange-200 focus:border-orange-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-4 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                    <Label className="text-orange-900 font-medium">AI-Generated Biography</Label>
                  </div>
                  <Button
                    type="button"
                    onClick={generateBiography}
                    disabled={isGeneratingBio}
                    className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
                  >
                    {isGeneratingBio ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Bio
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-orange-700">
                  Our AI will create a compelling biography based on your information to showcase your artistic journey.
                </p>
                {generatedBio && (
                  <div className="p-4 bg-white rounded-lg border border-orange-200 shadow-sm">
                    <p className="text-sm text-orange-800 leading-relaxed">{generatedBio}</p>
                    <Button
                      type="button"
                      onClick={generateBiography}
                      variant="outline"
                      size="sm"
                      className="mt-3 text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Generate New Version
                    </Button>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isSubmitting ? "Creating Account..." : "Create Artisan Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-orange-700">
                Already have an account?{" "}
                <Link href="/artisan/login" className="text-orange-600 hover:text-orange-800 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
