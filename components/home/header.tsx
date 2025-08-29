"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brush, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
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
  )
}