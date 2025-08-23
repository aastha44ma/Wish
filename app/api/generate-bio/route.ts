import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("[v0] API route /api/generate-bio called")

  try {
    const body = await request.json()
    console.log("[v0] Request body received:", body)

    const { name, place, expertise, learningSource, experience } = body

    // Validate required fields
    if (!name || !place || !expertise || !learningSource || !experience) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] All fields validated successfully")

    // Create a more sophisticated biography using the provided information
    const biographyTemplates = [
      `Meet ${name}, a masterful ${expertise} artisan from the culturally rich region of ${place}. ${name}'s journey into this ancient craft began ${learningSource}, where they discovered not just techniques, but a deep connection to their cultural heritage. With ${experience}, ${name} has developed a distinctive style that honors traditional methods while embracing contemporary innovation. Each creation reflects years of dedication, cultural pride, and an unwavering commitment to preserving the artistic legacy of their ancestors for future generations.`,

      `${name} is a distinguished ${expertise} artist whose roots run deep in ${place}, a place known for its artistic traditions. Their craft was nurtured ${learningSource}, providing them with both technical mastery and cultural understanding. Through ${experience}, ${name} has become not just an artisan, but a storyteller whose work speaks of heritage, passion, and artistic evolution. Every piece they create carries the essence of their journey, blending time-honored techniques with personal artistic vision.`,

      `From the vibrant artistic community of ${place} comes ${name}, a talented ${expertise} craftsperson whose work embodies the spirit of traditional Indian artistry. Having learned this beautiful craft ${learningSource}, ${name} brings a unique perspective shaped by both ancestral wisdom and personal creativity. Their ${experience} has culminated in a body of work that celebrates cultural heritage while speaking to contemporary sensibilities, making each creation a bridge between past and present.`,
    ]

    // Select a random template for variety
    const selectedTemplate = biographyTemplates[Math.floor(Math.random() * biographyTemplates.length)]

    console.log("[v0] Biography generated successfully")

    const response = { biography: selectedTemplate }
    console.log("[v0] Sending response:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] API Error generating biography:", error)
    return NextResponse.json({ error: "Failed to generate biography" }, { status: 500 })
  }
}

export async function GET() {
  console.log("[v0] API route GET method called - route is accessible")
  return NextResponse.json({ message: "Biography API is working" })
}
