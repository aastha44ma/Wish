"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Brush, Sparkles, Download, Heart, MessageCircle, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  sender: "buyer" | "artisan"
  content: string
  timestamp: Date
  type: "text" | "image"
  imageUrl?: string
}

interface DesignMockup {
  id: string
  prompt: string
  imageUrl: string
  timestamp: Date
  liked: boolean
}

export default function CoCreationStudio({ params }: { params: { projectId: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "artisan",
      content:
        "Hello! I'm excited to work on your custom mandala wall art project. I've reviewed your requirements and have some initial ideas to share.",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "2",
      sender: "buyer",
      content:
        "Hi Priya! Thank you for taking on this project. I'm really looking forward to seeing your interpretation of the lotus and peacock motifs.",
      timestamp: new Date(Date.now() - 3500000),
      type: "text",
    },
    {
      id: "3",
      sender: "artisan",
      content:
        "Perfect! Let me start by generating some initial design concepts based on your description. I'll incorporate traditional Rajasthani patterns with the lotus and peacock elements you mentioned.",
      timestamp: new Date(Date.now() - 3400000),
      type: "text",
    },
  ])

  const [designMockups, setDesignMockups] = useState<DesignMockup[]>([
    {
      id: "1",
      prompt: "Traditional Rajasthani mandala with lotus center and peacock motifs in blue and gold",
      imageUrl: "/blue-gold-mandala.png",
      timestamp: new Date(Date.now() - 3300000),
      liked: true,
    },
    {
      id: "2",
      prompt: "Geometric mandala with peacock feather patterns and lotus petals in terracotta and gold",
      imageUrl: "/terracotta-peacock-mandala.png",
      timestamp: new Date(Date.now() - 3200000),
      liked: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [designPrompt, setDesignPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "buyer",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate artisan response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: "artisan",
        content: "Thank you for the feedback! I'll incorporate those changes into the next iteration.",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const generateDesign = () => {
    if (!designPrompt.trim()) return

    setIsGenerating(true)

    setTimeout(() => {
      const designVariations = [
        "/generated-mandala-design.png",
        "/blue-gold-mandala.png",
        "/terracotta-peacock-mandala.png",
        "/lotus-geometric-pattern.png",
      ]

      const randomDesign = designVariations[Math.floor(Math.random() * designVariations.length)]

      const newMockup: DesignMockup = {
        id: Date.now().toString(),
        prompt: designPrompt,
        imageUrl: randomDesign,
        timestamp: new Date(),
        liked: false,
      }

      setDesignMockups((prev) => [newMockup, ...prev])
      setDesignPrompt("")
      setIsGenerating(false)

      // Add system message about new design
      const systemMessage: Message = {
        id: (Date.now() + 2).toString(),
        sender: "artisan",
        content: `I've generated a new design based on your prompt: "${designPrompt}". Please take a look in the Design Studio and let me know your thoughts!`,
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, systemMessage])
    }, 3000)
  }

  const toggleLike = (mockupId: string) => {
    setDesignMockups((prev) =>
      prev.map((mockup) => (mockup.id === mockupId ? { ...mockup, liked: !mockup.liked } : mockup)),
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Mock project data
  const project = {
    title: "Custom Mandala Wall Art",
    artisan: {
      name: "Priya Sharma",
      avatar: "/indian-artisan-smile.png",
      status: "online",
    },
    status: "in-progress",
    deadline: "2 weeks",
    budget: "$180",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Brush className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary font-serif">KalaDwar</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h2 className="font-bold text-foreground">{project.title}</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {project.status}
                  </Badge>
                  <span>•</span>
                  <Clock className="w-4 h-4" />
                  <span>{project.deadline} remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Side - Chat */}
        <div className="w-1/2 border-r border-border flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-border bg-muted/50">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={project.artisan.avatar || "/placeholder.svg"} alt={project.artisan.name} />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-foreground">{project.artisan.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "buyer" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[80%] ${
                      message.sender === "buyer" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      {message.sender === "artisan" ? (
                        <AvatarImage src={project.artisan.avatar || "/placeholder.svg"} alt={project.artisan.name} />
                      ) : (
                        <AvatarFallback>You</AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === "buyer"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === "buyer" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Design Studio */}
        <div className="w-1/2 flex flex-col">
          {/* Studio Header */}
          <div className="p-6 border-b border-border bg-muted/50">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold font-serif text-foreground">Design Studio</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Generate AI mockups and collaborate on design iterations
            </p>
          </div>

          {/* AI Generation Input */}
          <div className="p-6 border-b border-border">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDesignPrompt("Traditional paisley pattern with lotus motifs in warm terracotta and gold")
                  }
                  className="text-xs"
                >
                  Paisley & Lotus
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDesignPrompt("Geometric mandala with peacock feathers in royal blue and silver")}
                  className="text-xs"
                >
                  Peacock Mandala
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDesignPrompt("Minimalist floral border design with traditional Indian motifs")}
                  className="text-xs"
                >
                  Floral Border
                </Button>
              </div>

              <Textarea
                placeholder="Describe the design you'd like to generate... e.g., 'Create a mandala with lotus motifs in blue and gold colors'"
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <Button
                onClick={generateDesign}
                disabled={!designPrompt.trim() || isGenerating}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Design...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Design
                  </>
                )}
              </Button>

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="font-medium mb-1">💡 Generation Tips:</p>
                <ul className="space-y-1">
                  <li>• Be specific about colors, patterns, and cultural elements</li>
                  <li>• Mention size, style (traditional/modern), and intended use</li>
                  <li>• Include reference to Indian art forms (mandala, paisley, lotus, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Design Mockups */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {designMockups.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No designs yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate your first AI design mockup using the prompt above
                  </p>
                </div>
              ) : (
                designMockups.map((mockup) => (
                  <Card key={mockup.id} className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-2">Generated {formatTime(mockup.timestamp)}</p>
                          <p className="text-sm font-medium text-foreground">{mockup.prompt}</p>
                        </div>
                        {mockup.liked && (
                          <Badge variant="secondary" className="bg-red-100 text-red-600">
                            <Heart className="w-3 h-3 mr-1 fill-current" />
                            Liked
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="relative group">
                        <img
                          src={mockup.imageUrl || "/placeholder.svg"}
                          alt="Generated design"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => toggleLike(mockup.id)}
                              className={mockup.liked ? "bg-red-100 text-red-600" : "bg-white/90"}
                            >
                              <Heart className={`w-4 h-4 ${mockup.liked ? "fill-current" : ""}`} />
                            </Button>
                            <Button size="sm" variant="secondary" className="bg-white/90">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/90"
                              onClick={() => {
                                const message = `I'd like to discuss this design: "${mockup.prompt}"`
                                setNewMessage(message)
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDesignPrompt(`Refine this design: ${mockup.prompt}`)}
                          >
                            Refine
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDesignPrompt(`Create a variation of: ${mockup.prompt}`)}
                          >
                            Variation
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">{mockup.liked ? "❤️ Liked" : ""}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
